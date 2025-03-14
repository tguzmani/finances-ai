import axios, { AxiosInstance } from 'axios'

export class AxiosRepository {
  protected client: AxiosInstance

  constructor(resource: string) {
    const apiURL =
      import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api'
    const baseURL = `${apiURL}/${resource}`

    this.client = axios.create({
      baseURL,
    })
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data)
    return response.data
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url)
    return response.data
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await this.client.put<T>(url, data)
    return response.data
  }
}
