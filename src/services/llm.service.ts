import { ChatOpenAI } from '@langchain/openai'
import sheetsService from './sheets.service'

export interface TransactionData {
  date: string
  description: string
  debit_accounts: { account: string; amount: number }[] // Money destination(s)
  credit_accounts: { account: string; amount: number }[] // Money source(s)
  total_amount: number
  category?: string
  subcategory?: string
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
    "description":"string(≤25 chars,1st word capitalized)",
    "debit_accounts":[{"account":"string","amount":number}],
    "credit_accounts":[{"account":"string","amount":number}],
    "total_amount":number,
    "category":"string|empty",
    "subcategory":"string|empty"
    }
    
    Rules:
    - debit_accounts:Destination(expenses or assets).
    - credit_accounts:Source(payments or origin).
    - total_amount:sum debit=credit.
    - Default currency:USD;if "Bs", convert:(Bs/${bsDollarRate}=USD).
    - Categories ONLY for "Gastos";if "mixtos", category:"Otros", subcategory:"Otros".
    - Use ONLY provided Accounts/Categories.
    - Use full account names for "Gastos", example: "Gastos mercado".
    - Use full account names for "Ingresos", example: "Ingresos OneMeta".
    
    Sentence:"${prompt}"
    `)

  return JSON.parse(response.text)
}

const llmService = {
  parseTransactionPrompt,
}

export default llmService
