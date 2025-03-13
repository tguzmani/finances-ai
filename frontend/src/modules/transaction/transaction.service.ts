import { useMutation } from '@tanstack/react-query'
import { transactionRepository } from './transaction.repository'
import { TransactionData } from './transaction-registry.table'

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

export const useSaveTransactionData = () =>
  useMutation<void, Error, TransactionData>({
    mutationFn: (data: TransactionData) =>
      transactionRepository.saveTransactionData(data),
  })
