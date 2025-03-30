import { Request, Response } from 'express'
import budgetService from '../services/budget.service'

async function getBudgetsOverview(_req: Request, res: Response) {
  try {
    const budgets = await budgetService.getBudgetsOverview()
    res.json(budgets)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

const budgetController = {
  getBudgetsOverview,
}

export default budgetController
