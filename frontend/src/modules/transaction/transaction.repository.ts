import { AxiosRepository } from '../../common/axios.repository'
import { TransactionData } from './transaction-registry.table'
import { TransactionResponse } from './transaction.service'

class TransactionRepository extends AxiosRepository {
  constructor() {
    super('transactions')
  }

  async getTransactionData(prompt: string): Promise<TransactionResponse> {
    return this.post('/transaction-data', { prompt })
  }

  async saveTransactionData(transactionData: TransactionData): Promise<void> {
    return this.post('/save-transaction-data', { transactionData })
  }
}

export const transactionRepository = new TransactionRepository()
