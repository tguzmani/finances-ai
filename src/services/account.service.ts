import { BANESCO_BALANCE_VES_CELL } from '../common/constants/cells.constants'
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
  const vesUsdExchangeRate = await sheetsService.getBsDollarRate()
  const banescoVesBalance = await sheetsRepository.getSheetValues(
    BANESCO_BALANCE_VES_CELL
  )

  if (!banescoVesBalance) {
    throw new Error('❌ Failed to get Banesco balance.')
  }

  const vesBalance = amountToFloat(banescoVesBalance[0][0])
  const usdBalance = vesBalance / vesUsdExchangeRate

  const banescoUsd: AccountOverviewDto = {
    id: 'Banesco',
    label: 'Banesco',
    initialBalance: 0,
    in: 0,
    out: 0,
    balance: usdBalance,
    currency: Currency.USD,
  }

  const banescoVes: AccountOverviewDto = {
    id: 'Banesco VES',
    label: 'Banesco VES',
    initialBalance: 0,
    in: 0,
    out: 0,
    balance: vesBalance,
    currency: Currency.VES,
  }

  console.log('vesUsdExchangeRate', vesUsdExchangeRate)
  console.log('banescoUsd', banescoUsd)
  console.log('banescoVes', banescoVes)

  return { usd: banescoUsd, ves: banescoVes }
}

const accountService = {
  getAccountsOverview,
  getBanescoOverview,
}

export default accountService
