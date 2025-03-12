import { useQuery } from '@tanstack/react-query'
import { expenseRepository } from './expense.repository'

export const useGetCurrentTotalExpense = () =>
  useQuery<number, Error>({
    queryKey: ['current-total-expense'],
    queryFn: () => expenseRepository.getCurrentTotalExpense(),
  })
