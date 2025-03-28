import { useQuery } from '@tanstack/react-query'
import AccountQueryKeys from './account.query-keys'
import { accountRepository } from './accounts.repository'
import {
  AccountOverviewDto,
  BanescoOverviewDto,
} from '../../../../src/controllers/account.controller.model'

export const useGetAccountsOverview = () =>
  useQuery<AccountOverviewDto[], Error>({
    queryKey: [AccountQueryKeys.ACCOUNTS_OVERVIEW],
    queryFn: () => accountRepository.getAccountsOverview(),
  })

export const useGetBanescoOverview = () =>
  useQuery<BanescoOverviewDto, Error>({
    queryKey: [AccountQueryKeys.BANESCO_OVERVIEW],
    queryFn: () => accountRepository.getBanescoOverview(),
  })
