import { AxiosRepository } from '../../common/axios.repository'

class ExpenseRepository extends AxiosRepository {
  constructor() {
    super('expenses')
  }

  async getCurrentTotalExpense(): Promise<number> {
    const response = await this.get<any>('/current-total-expense')

    return response.currentTotalExpense
  }
}

export const expenseRepository = new ExpenseRepository()
