import dayjs from 'dayjs'
import { CURRENT_TOTAL_EXPENSE_CELL } from '../common/constants/cells.constants'
import { JOURNAL_BOOK_RANGE } from '../common/constants/range.constants'
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

const getTodayExpense = async () => {
  const journalBookRange = await sheetsRepository.getSheetValues(
    JOURNAL_BOOK_RANGE
  )

  if (!journalBookRange || journalBookRange.length === 0) {
    throw new Error('❌ Failed to get journal book data.')
  }

  // Get today's and yesterday's dates in format 'DD-MMM'
  const today = dayjs().format('DD-MMM')
  const yesterday = dayjs().subtract(1, 'day').format('DD-MMM')

  let totalExpense = 0
  let yesterdayExpense = 0

  journalBookRange.forEach(row => {
    const [date, , category, , amount] = row

    // Ensure the row has a valid category containing "Gastos" and an amount
    if (category?.includes('Gastos') && amount) {
      const expenseAmount = parseFloat(amount.replace('$', '').trim())

      if (!isNaN(expenseAmount)) {
        if (date?.includes(today)) {
          totalExpense += expenseAmount
        } else if (date?.includes(yesterday)) {
          yesterdayExpense += expenseAmount
        }
      }
    }
  })

  // Calculate the expense difference
  const expenseDifference = totalExpense - yesterdayExpense

  return {
    totalExpense,
    yesterdayExpense,
    expenseDifference,
  }
}

const expenseService = {
  getCurrentTotalExpense,
  getTodayExpense,
}

export default expenseService
