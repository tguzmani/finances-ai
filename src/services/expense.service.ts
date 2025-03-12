import { CURRENT_TOTAL_EXPENSE_CELL } from '../common/constants/cells.constants'
import sheetsRepository from '../common/sheets.repository'

const getCurrentTotalExpense = async () => {
  const cellValue = await sheetsRepository.getSheetValues(
    CURRENT_TOTAL_EXPENSE_CELL
  )

  if (!cellValue) {
    throw new Error('❌ Failed to get current total expense.')
  }

  return parseFloat(cellValue[0][0].replace('$', ''))
}

const expenseService = {
  getCurrentTotalExpense,
}

export default expenseService
