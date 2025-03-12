import { CURRENT_TOTAL_EXPENSE_CELL } from '../common/constants/cells.constants'
import sheetsRepository from '../common/sheets.repository'

const getCurrentTotalExpense = async () => {
  return await sheetsRepository.getSheetValues(CURRENT_TOTAL_EXPENSE_CELL)
}

const expenseService = {
  getCurrentTotalExpense,
}

export default expenseService
