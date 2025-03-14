import { ACCOUNTS_RANGE } from '../common/constants/range.constants'
import sheetsRepository from '../common/sheets.repository'
import {
  AccountOverviewDto,
  Currency,
} from '../controllers/account.controller.model'
import { amountToFloat } from '../util'
import sheetsService from './sheets.service'

async function getAccountsOverview() {
  const accountsRange = await sheetsRepository.getSheetValues(ACCOUNTS_RANGE)
  const vesUsdExchangeRate = await sheetsService.getBsDollarRate()

  if (!accountsRange || accountsRange.length === 0) {
    throw new Error('❌ Failed to get accounts data.')
  }

  let accounts: AccountOverviewDto[] = accountsRange.map(row => ({
    id: row[0],
    label: row[0],
    initialBalance: amountToFloat(row[1]),
    in: amountToFloat(row[4]),
    out: amountToFloat(row[5]),
    balance: amountToFloat(row[6]),
    currency: Currency.USD,
  }))

  const banescoAccount = accounts.find(account => account.id === 'Banesco')

  if (banescoAccount) {
    const banescoAccountVes = {
      ...banescoAccount,
      id: 'Banesco VES',
      label: 'Banesco VES',
      initialBalance: banescoAccount?.initialBalance * vesUsdExchangeRate,
      in: banescoAccount?.in * vesUsdExchangeRate,
      out: banescoAccount?.out * vesUsdExchangeRate,
      balance: banescoAccount?.balance * vesUsdExchangeRate,
      currency: Currency.VES,
    }

    accounts.push(banescoAccountVes)
  }

  return accounts.sort((a, b) => a.label.localeCompare(b.label))
}

const accountService = {
  getAccountsOverview,
}

export default accountService
