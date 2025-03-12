import { AxiosRepository } from '../../common/axios.repository'
import { TransactionResponse } from './transaction.service'

class TransactionRepository extends AxiosRepository {
  async addTransaction(prompt: string): Promise<TransactionResponse> {
    return this.post('/add-transaction', { prompt })
  }
}

export const transactionRepository = new TransactionRepository()
