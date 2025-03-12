import { useMutation } from '@tanstack/react-query'
import { transactionRepository } from './transaction.repository'

export interface TransactionResponse {
  message: string
  data: {
    date: string
    description: string
    debit_accounts: { account: string; amount: number }[]
    credit_accounts: { account: string; amount: number }[]
    total_amount: number
    category?: string
    subcategory?: string
  }
}

export const useAddTransaction = () => {
  return useMutation<TransactionResponse, Error, string>({
    mutationFn: (prompt: string) =>
      transactionRepository.addTransaction(prompt),
  })
}
