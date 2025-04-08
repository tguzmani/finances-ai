import { useMutation } from '@tanstack/react-query'
import { accountRepository } from './accounts.repository'

export const useAdjustBanescoBalance = () => {
  return useMutation({
    mutationFn: (balance: number) =>
      accountRepository.adjustBanescoBalance(balance),
  })
}
