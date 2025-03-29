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

  if (!accountsRange || accountsRange.length === 0) {
    throw new Error('❌ Failed to get accounts data.')
  }

  const accounts: AccountOverviewDto[] = accountsRange.map(row => ({
    id: row[0],
    label: row[0],
    initialBalance: amountToFloat(row[1]),
    in: amountToFloat(row[4]),
    out: amountToFloat(row[5]),
    balance: amountToFloat(row[6]),
    currency: Currency.USD,
  }))

  return accounts.sort((a, b) => a.label.localeCompare(b.label))
}

async function getBanescoOverview() {
  const accountsRange = await sheetsRepository.getSheetValues(ACCOUNTS_RANGE)
  const vesUsdExchangeRate = await sheetsService.getBsDollarRate()

  if (!accountsRange || accountsRange.length === 0) {
    throw new Error('❌ Failed to get Banesco account data.')
  }

  const banescoRow = accountsRange.find(row => row[0] === 'Banesco')
  if (!banescoRow) {
    throw new Error('❌ Banesco account not found.')
  }

  const banescoUsd: AccountOverviewDto = {
    id: 'Banesco',
    label: 'Banesco',
    initialBalance: amountToFloat(banescoRow[1]),
    in: amountToFloat(banescoRow[4]),
    out: amountToFloat(banescoRow[5]),
    balance: amountToFloat(banescoRow[6]),
    currency: Currency.USD,
  }

  const banescoVes: AccountOverviewDto = {
    id: 'Banesco VES',
    label: 'Banesco VES',
    initialBalance: banescoUsd.initialBalance * vesUsdExchangeRate,
    in: banescoUsd.in * vesUsdExchangeRate,
    out: banescoUsd.out * vesUsdExchangeRate,
    balance: banescoUsd.balance * vesUsdExchangeRate,
    currency: Currency.VES,
  }

  return { usd: banescoUsd, ves: banescoVes }
}

const accountService = {
  getAccountsOverview,
  getBanescoOverview,
}

export default accountService
