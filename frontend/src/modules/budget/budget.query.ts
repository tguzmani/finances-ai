import { useQuery } from '@tanstack/react-query'
import { budgetRepository } from './budget.repository'
import BudgetQueryKeys from './budget.query-keys'
import { BudgetsOverviewResponse } from '../../../../src/controllers/budget.controller.model'

export const useGetBudgetsOverview = () =>
  useQuery<BudgetsOverviewResponse, Error>({
    queryKey: [BudgetQueryKeys.BUDGETS_OVERVIEW],
    queryFn: () => budgetRepository.getBudgetsOverview(),
  })
