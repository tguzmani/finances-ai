import { BUDGETS_RANGE } from '../common/constants/range.constants'
import sheetsRepository from '../common/sheets.repository'
import { BudgetOverviewDto } from '../controllers/budget.controller.model'
import { amountToFloat } from '../util'
import { BUDGET_FIRST_ROW } from '../common/constants/cells.constants'

async function getBudgetsOverview(): Promise<BudgetOverviewDto[]> {
  const budgetsRange = await sheetsRepository.getSheetValues(BUDGETS_RANGE)

  if (!budgetsRange || budgetsRange.length === 0) {
    throw new Error('❌ Failed to get budgets data.')
  }

  const budgetsByCategory = new Map<string, BudgetOverviewDto>()

  budgetsRange.forEach((row, index) => {
    const category = row[0]
    const subcategory = row[1]
    const cap = amountToFloat(row[2])
    const spent = amountToFloat(row[4])
    const available = amountToFloat(row[5])
    const rowId = BUDGET_FIRST_ROW + index

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
      rowId,
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

async function autoAdjustBudgetCap(rowId: number): Promise<void> {
  // Get the current spent value from column E
  const spentCell = `Presupuestos!E${rowId}`
  const spentValue = await sheetsRepository.getSheetValues(spentCell)

  if (!spentValue || spentValue.length === 0) {
    throw new Error('❌ Failed to get spent value.')
  }

  const spent = amountToFloat(spentValue[0][0])

  // Update the cap in column C with the spent value
  const capCell = `Presupuestos!C${rowId}`
  await sheetsRepository.updateSheetValues(capCell, [[spent]])
}

const budgetService = {
  getBudgetsOverview,
  autoAdjustBudgetCap,
}

export default budgetService
