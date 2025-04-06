import dayjs from 'dayjs'
import { CURRENT_TOTAL_EXPENSE_CELL } from '../common/constants/cells.constants'
import {
  EXPENSE_STATUSES_RANGE,
  JOURNAL_BOOK_RANGE,
} from '../common/constants/range.constants'
import sheetsRepository from '../common/sheets.repository'
import { amountToFloat } from '../util'

export async function getCurrentTotalExpense() {
  const cellValue = await sheetsRepository.getSheetValues(
    CURRENT_TOTAL_EXPENSE_CELL
  )

  if (!cellValue) {
    throw new Error('❌ Failed to get current total expense.')
  }

  return amountToFloat(cellValue[0][0])
}

async function getTodayExpense() {
  const journalBookRange = await sheetsRepository.getSheetValues(
    JOURNAL_BOOK_RANGE
  )

  if (!journalBookRange || journalBookRange.length === 0) {
    throw new Error('❌ Failed to get journal book data.')
  }

  // Format dates without leading zeros
  const today = dayjs().format('D-MMM')
  const yesterday = dayjs().subtract(1, 'day').format('D-MMM')

  let totalExpense = 0
  let yesterdayExpense = 0

  journalBookRange.forEach(row => {
    const [date, , category, , amount] = row

    // Ensure the row has a valid category containing "Gastos" and an amount
    if (category?.includes('Gastos') && amount) {
      const expenseAmount = parseFloat(amount.replace(/[$\s]/g, '').trim())

      if (!isNaN(expenseAmount)) {
        if (date === today) {
          totalExpense += expenseAmount
        } else if (date === yesterday) {
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

async function getExpenseStatus() {
  const expenseStatus = await sheetsRepository.getSheetValues(
    EXPENSE_STATUSES_RANGE
  )

  if (!expenseStatus || expenseStatus.length === 0) {
    throw new Error('❌ Failed to get expense status data.')
  }

  const assetsEqualsLiabilitiesPlusEquity = {
    satisfied: expenseStatus[0][1] === 'TRUE',
    label: 'A = L + E',
  }

  const journalExpenseEqualsBudgetsExpense = {
    satisfied: expenseStatus[1][1] === 'TRUE',
    label: 'GP = GL',
  }

  return [assetsEqualsLiabilitiesPlusEquity, journalExpenseEqualsBudgetsExpense]
}

const expenseService = {
  getCurrentTotalExpense,
  getTodayExpense,
  getExpenseStatus,
}

export default expenseService
