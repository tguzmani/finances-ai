import { Request, Response } from 'express'
import expenseService from '../services/expense.service'

export const getCurrentTotalExpense = async (_req: Request, res: Response) => {
  try {
    const currentTotalExpense = await expenseService.getCurrentTotalExpense()

    console.log('currentTotalExpense', currentTotalExpense)

    res.status(200).json({ currentTotalExpense })
  } catch (error: any) {
    console.error('Sheets Test Error:', error)
    res.status(500).json({
      error: error.message || '❌ Google Sheets connection failed!',
    })
  }
}

export const getTodayExpense = async (_req: Request, res: Response) => {
  try {
    const todayExpense = await expenseService.getTodayExpense()

    res.status(200).json({ ...todayExpense })
  } catch (error: any) {
    console.error('Sheets Test Error:', error)
    res.status(500).json({
      error: error.message || '❌ Google Sheets connection failed!',
    })
  }
}

export const getExpenseStatus = async (_req: Request, res: Response) => {
  try {
    const expenseStatus = await expenseService.getExpenseStatus()

    res.status(200).json(expenseStatus)
  } catch (error: any) {
    console.error('Sheets Test Error:', error)
    res.status(500).json({
      error: error.message || '❌ Google Sheets connection failed!',
    })
  }
}
