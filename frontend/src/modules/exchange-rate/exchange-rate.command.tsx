import { useMutation } from '@tanstack/react-query'
import { exchangeRateRepository } from './exchange-rate.repository'

export const useUpdateExchangeRate = () => {
  return useMutation<void, Error, string>({
    mutationFn: (exchangeRate: string) =>
      exchangeRateRepository.updateExchangeRate(exchangeRate),
  })
}
