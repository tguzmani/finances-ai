import { BUDGETS_RANGE } from '../common/constants/range.constants'
import sheetsRepository from '../common/sheets.repository'
import {
  BudgetOverviewDto,
  BudgetSubcategoryDto,
} from '../controllers/budget.controller.model'
import { amountToFloat } from '../util'

async function getBudgetsOverview(): Promise<BudgetOverviewDto[]> {
  const budgetsRange = await sheetsRepository.getSheetValues(BUDGETS_RANGE)

  if (!budgetsRange || budgetsRange.length === 0) {
    throw new Error('❌ Failed to get budgets data.')
  }

  const budgetsByCategory = new Map<string, BudgetOverviewDto>()

  budgetsRange.forEach(row => {
    const category = row[0]
    const subcategory = row[1]
    const cap = amountToFloat(row[2])
    const spent = amountToFloat(row[4])
    const available = amountToFloat(row[5])

    if (!budgetsByCategory.has(category)) {
      budgetsByCategory.set(category, {
        category,
        subcategories: [],
        totalCap: 0,
        totalSpent: 0,
        totalAvailable: 0,
      })
    }

    const categoryBudget = budgetsByCategory.get(category)!
    categoryBudget.subcategories.push({
      subcategory,
      cap,
      spent,
      available,
    })
    categoryBudget.totalCap += cap
    categoryBudget.totalSpent += spent
    categoryBudget.totalAvailable += available
  })

  return Array.from(budgetsByCategory.values()).sort((a, b) =>
    a.category.localeCompare(b.category)
  )
}

const budgetService = {
  getBudgetsOverview,
}

export default budgetService
