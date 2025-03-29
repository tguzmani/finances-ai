import { Request, Response } from 'express'
import accountService from '../services/account.service'

export const getAccountsOverview = async (_req: Request, res: Response) => {
  try {
    const accounts = await accountService.getAccountsOverview()
    res.status(200).json(accounts)
  } catch (error: any) {
    console.error('Sheets Test Error:', error)
    res.status(500).json({
      error: error.message || '❌ Google Sheets connection failed!',
    })
  }
}

export const getBanescoOverview = async (_req: Request, res: Response) => {
  try {
    const banescoOverview = await accountService.getBanescoOverview()
    res.json(banescoOverview)
  } catch (error: any) {
    console.error('Sheets Test Error:', error)
    res.status(500).json({
      error: error.message || '❌ Google Sheets connection failed!',
    })
  }
}

const accountController = {
  getAccountsOverview,
  getBanescoOverview,
}

export default accountController
