import { useQuery } from '@tanstack/react-query'
import ExchangeRateQueryKeys from './exchange-rate.query-keys'
import { exchangeRateRepository } from './exchange-rate.repository'
import { ExchangeRateOverviewDto } from '../../../../src/controllers/exchange-rate.controller.model'

export const useGetExchangeRatesOverview = () =>
  useQuery<ExchangeRateOverviewDto, Error>({
    queryKey: [ExchangeRateQueryKeys.EXCHANGE_RATES_OVERVIEW],
    queryFn: () => exchangeRateRepository.getExchangeRatesOverview(),
  })
