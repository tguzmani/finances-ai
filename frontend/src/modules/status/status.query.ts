import { useQuery } from '@tanstack/react-query'
import StatusQueryKeys from './status.query-keys'
import { statusRepository } from './status.repository'

export const useGetStatus = () =>
  useQuery({
    queryKey: [StatusQueryKeys.STATUS],
    queryFn: () => statusRepository.getStatus(),
  })
