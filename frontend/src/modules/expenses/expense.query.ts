import { useQuery } from '@tanstack/react-query'
import { expenseRepository } from './expense.repository'
import ExpenseQueryKeys from './expense.query-keys'
import { TodayExpensesResponse } from '../../../../src/controllers/expense.controller.model'

export const useGetCurrentTotalExpense = () =>
  useQuery<number, Error>({
    queryKey: [ExpenseQueryKeys.CURRENT_TOTAL_EXPENSE],
    queryFn: () => expenseRepository.getCurrentTotalExpense(),
  })

export const useGetTodayExpense = () =>
  useQuery<TodayExpensesResponse, Error>({
    queryKey: [ExpenseQueryKeys.TODAY_EXPENSE],
    queryFn: () => expenseRepository.getTodayExpense(),
  })

export const useGetExpenseStatus = () =>
  useQuery<any, Error>({
    queryKey: [ExpenseQueryKeys.EXPENSE_STATUS],
    queryFn: () => expenseRepository.getExpenseStatus(),
  })
