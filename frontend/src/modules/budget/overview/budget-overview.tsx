import { Stack } from '@mui/material'
import { useGetBudgetsOverview } from '../budget.query'
import BudgetCategory from './budget-category'
import BudgetSkeleton from './budget-skeleton'

const BudgetOverview = () => {
  const { data: budgets, isLoading } = useGetBudgetsOverview()

  if (isLoading) {
    return (
      <Stack spacing={2}>
        {[1, 2, 3, 4, 5].map(item => (
          <BudgetSkeleton key={item} />
        ))}
      </Stack>
    )
  }

  if (!budgets) return null

  return (
    <Stack spacing={2}>
      {budgets.map(budget => (
        <BudgetCategory key={budget.category} budget={budget} />
      ))}
    </Stack>
  )
}

export default BudgetOverview
