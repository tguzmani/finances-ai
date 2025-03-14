import { VESUSD_EXCHANGE_RATE_CELL } from '../common/constants/cells.constants'
import sheetsRepository from '../common/sheets.repository'
import { ExchangeRateOverviewDto } from '../controllers/exchange-rate.controller.model'
import bcvScrapper from './bcv.scrapper'
import sheetsService from './sheets.service'

async function getExchangeRateOverview(): Promise<ExchangeRateOverviewDto> {
  const vesUsdExchangeRate = await sheetsService.getBsDollarRate()
  const bcvExchangeRate = await bcvScrapper.getBcvExchangeRate()

  if (!vesUsdExchangeRate || !bcvExchangeRate) {
    throw new Error('Error getting exchange rate')
  }

  const exchangeVariation = (1 - bcvExchangeRate / vesUsdExchangeRate) * 100

  return {
    vesUsdExchangeRate,
    bcvExchangeRate,
    exchangeVariation,
  }
}

async function updateExchangeRate(exchangeRate: string) {
  await sheetsRepository.updateSheetValues(VESUSD_EXCHANGE_RATE_CELL, [
    [parseFloat(exchangeRate)],
  ])
}

export const exchangeRateService = {
  getExchangeRateOverview,
  updateExchangeRate,
}

export default exchangeRateService
