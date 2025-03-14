import { FormEvent, useState } from 'react'
import BottomDrawer, { BottomDrawerProps } from '../layout/bottom-drawer'
import { BottomDrawerInput } from '../layout/bottom-drawer-input'
import { useUpdateExchangeRate } from './exchange-rate.command'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import ExchangeRateQueryKeys from './exchange-rate.query-keys'

const UpdateExchangeRateDrawer = (props: BottomDrawerProps) => {
  const [exchangeRate, setExchangeRate] = useState<string>('')

  const queryClient = useQueryClient()

  const { mutate: updateExchangeRate, isPending } = useUpdateExchangeRate()

  const handleUpdateExchangeRate = (e: FormEvent<HTMLElement>) => {
    updateExchangeRate(exchangeRate, {
      onSuccess: () => {
        props.onClose(e)

        queryClient.invalidateQueries({
          queryKey: [ExchangeRateQueryKeys.EXCHANGE_RATES_OVERVIEW],
        })
      },
      onError: () => {
        toast.error('Failed to update exchange rate')
      },
    })
  }

  return (
    <BottomDrawer {...props}>
      <BottomDrawerInput
        placeholder='Enter exchange rate'
        value={exchangeRate}
        setValue={setExchangeRate}
        handleSubmit={handleUpdateExchangeRate}
        isPending={isPending}
      />
    </BottomDrawer>
  )
}

export default UpdateExchangeRateDrawer
