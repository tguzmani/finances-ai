import { useQuery } from '@tanstack/react-query'
import { transactionRepository } from './transaction.repository'
import TransactionQueryKeys from './transaction.query-keys'
import { TransactionResponse } from './transaction.service'

export const useGetTransactionData = (prompt: string) =>
  useQuery<TransactionResponse, Error>({
    queryKey: [TransactionQueryKeys.TRANSACTION_DATA],
    queryFn: () => transactionRepository.getTransactionData(prompt),
    enabled: false,
  })
