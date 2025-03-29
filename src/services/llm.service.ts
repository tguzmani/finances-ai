import { ChatOpenAI } from '@langchain/openai'
import sheetsService from './sheets.service'

export interface AccountEntry {
  account: string
  amount: number
  category?: string
  subcategory?: string
}

export interface TransactionData {
  date: string
  description: string
  debit_accounts: AccountEntry[]
  credit_accounts: AccountEntry[]
}

const ACCOUNT_LIST = `
Activos: Bofa,Banesco,Binance,Cash,Zinli,Bybit,Bofa TDC,Por cobrar Norma,Por cobrar Esther,Wallet.
Pasivos: Por pagar Norma,Por pagar Esther.
Patrimonio: Patrimonio.
Ingresos: OneMeta,Devups,intereses.
Gastos: wishlist,mercado,curda,weed,gasolina,mixtos,casa,medicinas,gimnasio,UCAB.
`

const CATEGORY_LIST = `
Esther:Esther
Comida:Pescado,Carne,Mercado,Delivery,Local
Carro:Gasolina,Servicio
Vicio:Curda,Weed,Cafeína
Servicio:Subscripciones,Internet,Gimnasio
Otros:Otros,Comisiones
Salud:Consultas,Medicinas
UCAB:Matrícula
Wishlist:Wishlist
Casa:Neyda,Casa
`

export const parseTransactionPrompt = async (
  prompt: string
): Promise<TransactionData> => {
  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-4',
    temperature: 0,
  })

  const currentDate = new Date()
  const bsDollarRate = await sheetsService.getBsDollarRate()

  const response = await llm.invoke(`
    Accounts:${ACCOUNT_LIST}
    Categories:${CATEGORY_LIST}
    Date if missing:${currentDate}, format:MM/DD/YYYY.
    Bs to USD:${bsDollarRate}.
    
    Output exact JSON:
    {
    "date":"MM/DD/YYYY",
    "description":"string(≤25 chars,from text before first period)",
    "debit_accounts":[{
      "account":"string",
      "amount":number,
      "category":"string|empty",
      "subcategory":"string|empty"
    }],
    "credit_accounts":[{"account":"string","amount":number}]
    }
    
    Rules:
    - Input format: "[Description]. [Transaction details]"
    - Description is always the text before the first period.
    - Input can be in Spanish or Spanglish, but output must be in English format.
    - Common Spanish inputs:
      * "gasté/gaste/gasto" = spent (requires category+subcategory)
      * "pagué/pague/page" = paid
      * "compré/compre" = bought
      * "transferí/transferi" = transferred
      * "recibí/recibi" = received
      * "bs/bss/bolivares" = convert to USD using rate
    - debit_accounts: Destination of money (expenses or assets).
      * If account starts with "Gastos", MUST include category and subcategory.
      * Other debit accounts (assets) don't need categories.
    - credit_accounts: Source of money (payments or origin).
    - Debits total must equal Credits total.
    - Default currency:USD; if amount in "Bs/bss/bolivares", convert:(Bs/${bsDollarRate}=USD). Use 10 decimal places.
    - Use ONLY provided Accounts/Categories from lists above.
    - Use full account names for "Gastos", example: "Gastos mercado".
    - Use full account names for "Ingresos", example: "Ingresos OneMeta".
    
    Example inputs:
    - "Mercado semanal. gasté 50$ en mercado con bofa" 
      -> description: "Mercado semanal"
      -> debit: {"account":"Gastos mercado","category":"Comida","subcategory":"Mercado"}
    - "Crypto transfer. transferi 100$ a binance desde bofa" 
      -> description: "Crypto transfer"
      -> debit: {"account":"Binance"} (no category needed for assets)
    
    Sentence:"${prompt}"
    `)

  return JSON.parse(response.text)
}

const llmService = {
  parseTransactionPrompt,
}

export default llmService
