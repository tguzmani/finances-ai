import { ExchangeRateOverviewDto } from './../../../../src/controllers/exchange-rate.controller.model'
import { AxiosRepository } from '../../common/axios.repository'

class ExchangeRateRepository extends AxiosRepository {
  constructor() {
    super('exchange-rates')
  }

  async getExchangeRatesOverview(): Promise<ExchangeRateOverviewDto> {
    const response = await this.get<ExchangeRateOverviewDto>('/overview')

    return response
  }
}

export const exchangeRateRepository = new ExchangeRateRepository()
