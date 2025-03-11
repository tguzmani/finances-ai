import { Request, Response } from 'express'
import sheetsService from '../services/sheets.service'

export const testSheetsConnection = async (_req: Request, res: Response) => {
  try {
    await sheetsService.insertTestRow()

    res.status(200).json({ message: '✅ Google Sheets connection successful!' })
  } catch (error: any) {
    console.error('Sheets Test Error:', error)
    res.status(500).json({
      error: error.message || '❌ Google Sheets connection failed!',
    })
  }
}
