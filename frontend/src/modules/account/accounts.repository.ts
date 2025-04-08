import {
  AccountOverviewDto,
  BanescoOverviewDto,
} from './../../../../src/controllers/account.controller.model'
import { AxiosRepository } from '../../common/axios.repository'

class AccountRepository extends AxiosRepository {
  constructor() {
    super('accounts')
  }

  async getAccountsOverview(): Promise<AccountOverviewDto[]> {
    const response = await this.get<any>('/overview')

    return response
  }

  async getBanescoOverview(): Promise<BanescoOverviewDto> {
    const response = await this.get<any>('/banesco')
    return response
  }

  async adjustBanescoBalance(balance: number) {
    const response = await this.post<any>('/banesco/adjust', { balance })
    return response
  }
}

export const accountRepository = new AccountRepository()
