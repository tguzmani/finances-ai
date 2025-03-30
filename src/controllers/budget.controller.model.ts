export interface BudgetSubcategoryDto {
  subcategory: string
  cap: number
  spent: number
  available: number
}

export interface BudgetOverviewDto {
  category: string
  subcategories: BudgetSubcategoryDto[]
  totalCap: number
  totalSpent: number
  totalAvailable: number
}

export type BudgetsOverviewResponse = BudgetOverviewDto[]
