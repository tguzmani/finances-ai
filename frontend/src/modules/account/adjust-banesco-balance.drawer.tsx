import { FormEvent, useState } from 'react'
import BottomDrawer, { BottomDrawerProps } from '../layout/bottom-drawer'
import { BottomDrawerInput } from '../layout/bottom-drawer-input'
import { useAdjustBanescoBalance } from './account.command'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import AccountQueryKeys from './account.query-keys'

const AdjustBanescoBalanceDrawer = (props: BottomDrawerProps) => {
  const [balance, setBalance] = useState<string>('')
  const queryClient = useQueryClient()

  const { mutate: adjustBanescoBalance, isPending } = useAdjustBanescoBalance()

  const handleAdjustBalance = (e: FormEvent<HTMLElement>) => {
    adjustBanescoBalance(parseFloat(balance), {
      onSuccess: () => {
        props.onClose(e)
        queryClient.invalidateQueries({
          queryKey: [AccountQueryKeys.BANESCO_OVERVIEW],
        })
        toast.success('Banesco balance adjusted successfully')
      },
      onError: () => {
        toast.error('Failed to adjust Banesco balance')
      },
    })
  }

  return (
    <BottomDrawer {...props}>
      <BottomDrawerInput
        slotProps={{
          textField: {
            placeholder: 'Enter new Banesco VES balance',
          },
        }}
        value={balance}
        setValue={setBalance}
        handleSubmit={handleAdjustBalance}
        isPending={isPending}
      />
    </BottomDrawer>
  )
}

export default AdjustBanescoBalanceDrawer
