export enum Currency {
  VES = 'ves',
  USD = 'usd',
}
export interface AccountOverviewDto {
  id: string
  label: string
  initialBalance: number
  in: number
  out: number
  balance: number
  currency: Currency
}

export interface BanescoOverviewDto {
  usd: AccountOverviewDto
  ves: AccountOverviewDto
}
