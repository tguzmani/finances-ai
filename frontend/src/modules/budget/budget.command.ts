import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetRepository } from './budget.repository'
import BudgetQueryKeys from './budget.query-keys'

export const useAutoAdjustBudget = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (rowId: number) => budgetRepository.autoAdjustBudget(rowId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BudgetQueryKeys.BUDGETS_OVERVIEW],
      })
    },
  })
}
