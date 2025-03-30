import { BudgetsOverviewResponse } from '../../../../src/controllers/budget.controller.model'
import { AxiosRepository } from '../../common/axios.repository'

class BudgetRepository extends AxiosRepository {
  constructor() {
    super('budgets')
  }

  async getBudgetsOverview(): Promise<BudgetsOverviewResponse> {
    const response = await this.get<BudgetsOverviewResponse>('/overview')
    return response
  }
}

export const budgetRepository = new BudgetRepository()
