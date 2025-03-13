import { useQuery } from '@tanstack/react-query'
import { expenseRepository } from './expense.repository'
import ExpenseQueryKeys from './expense.query-keys'

export const useGetCurrentTotalExpense = () =>
  useQuery<number, Error>({
    queryKey: [ExpenseQueryKeys.CURRENT_TOTAL_EXPENSE],
    queryFn: () => expenseRepository.getCurrentTotalExpense(),
  })

export const useGetTodayExpense = () =>
  useQuery<any, Error>({
    queryKey: [ExpenseQueryKeys.TODAY_EXPENSE],
    queryFn: () => expenseRepository.getTodayExpense(),
  })
