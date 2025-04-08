import { AxiosRepository } from '../../common/axios.repository'

class StatusRepository extends AxiosRepository {
  constructor() {
    super('status')
  }

  async getStatus() {
    const response = await this.get<any>('/')
    return response
  }
}

export const statusRepository = new StatusRepository()
