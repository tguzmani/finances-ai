import { Request, Response } from 'express'
import exchangeRateService from '../services/exchange-rate.service'

export async function getExchangeRateOverview(_req: Request, res: Response) {
  try {
    const exchangeRateOverview =
      await exchangeRateService.getExchangeRateOverview()

    res.status(200).json(exchangeRateOverview)
  } catch (error: any) {
    console.error('Sheets Test Error:', error)
    res.status(500).json({
      error: error.message || '❌ Error getting exchange rate',
    })
  }
}

export async function updateExchangeRate(req: Request, res: Response) {
  try {
    const { exchangeRate } = req.body

    await exchangeRateService.updateExchangeRate(exchangeRate)

    res.status(200).json({ message: 'Exchange rate updated' })
  } catch (error: any) {
    console.error('Sheets Test Error:', error)
    res.status(500).json({
      error: error.message || '❌ Error updating exchange rate',
    })
  }
}
