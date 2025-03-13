import { ACCOUNTS_RANGE } from '../common/constants/range.constants'
import sheetsRepository from '../common/sheets.repository'
import { AccountOverviewDto } from '../controllers/account.controller.model'
import { amountToFloat } from '../util'

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
  }))

  return accounts
}

const accountService = {
  getAccountsOverview,
}

export default accountService
