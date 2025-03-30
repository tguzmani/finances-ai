import { Request, Response } from 'express'
import budgetService from '../services/budget.service'

export const getBudgetsOverview = async (_req: Request, res: Response) => {
  try {
    const budgets = await budgetService.getBudgetsOverview()
    res.json(budgets)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export const autoAdjustBudgetCap = async (req: Request, res: Response) => {
  const { rowId } = req.body

  try {
    if (!rowId) {
      res.status(400).json({ message: 'Row ID is required' })
      return
    }

    await budgetService.autoAdjustBudgetCap(rowId)
    res.json({ message: 'Budget cap auto-adjusted successfully' })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
