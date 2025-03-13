import { VESUSD_EXCHANGE_RATE_CELL } from '../common/constants/cells.constants'
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

export const exchangeRateService = {
  getExchangeRateOverview,
}

export default exchangeRateService
