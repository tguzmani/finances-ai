import { TodayExpensesDto } from '../../../../src/controllers/expense.controller.model'
import { AxiosRepository } from '../../common/axios.repository'

class ExpenseRepository extends AxiosRepository {
  constructor() {
    super('expenses')
  }

  async getCurrentTotalExpense(): Promise<number> {
    const response = await this.get<any>('/current-total-expense')

    return response.currentTotalExpense
  }

  async getTodayExpense(): Promise<TodayExpensesDto> {
    const response = await this.get<any>('/today-expense')

    return response
  }

  async getExpenseStatus(): Promise<string> {
    const response = await this.get<any>('/expense-status')

    return response
  }
}

export const expenseRepository = new ExpenseRepository()
