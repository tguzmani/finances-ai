import { Request, Response } from 'express'
import llmService from '../services/llm.service'
import sheetsService from '../services/sheets.service'

export const createTransactionData = async (req: Request, res: Response) => {
  const { prompt } = req.body

  try {
    const transactionData = await llmService.parseTransactionPrompt(prompt)

    res.status(201).json({
      message: '✅ Transaction created successfully!',
      data: transactionData,
    })
  } catch (error: any) {
    console.error('Transaction Error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const saveTransactionData = async (req: Request, res: Response) => {
  const { transactionData } = req.body

  try {
    await sheetsService.insertTransactionToSheet(transactionData)

    res.status(201).json({
      message: '✅ Transaction saved successfully!',
      data: transactionData,
    })
  } catch (error: any) {
    console.error('Transaction Error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
