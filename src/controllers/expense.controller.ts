import { Request, Response } from 'express'
import expenseService from '../services/expense.service'

export const getCurrentTotalExpense = async (_req: Request, res: Response) => {
  try {
    const currentTotalExpense = await expenseService.getCurrentTotalExpense()

    res.status(200).json({ currentTotalExpense })
  } catch (error: any) {
    console.error('Sheets Test Error:', error)
    res.status(500).json({
      error: error.message || '❌ Google Sheets connection failed!',
    })
  }
}
