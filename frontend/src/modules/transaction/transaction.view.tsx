// transaction.view.tsx
import { useState } from 'react'
import { Stack, Container, Collapse } from '@mui/material'
import { TransactionRegistryTable } from './transaction-registry.table'
import { useGetTransactionData } from './transaction.query'
import { BottomDrawerInput } from '../layout/bottom-drawer-input'

interface TransactionViewProps {
  handleCloseDialog: () => void
}

export const TransactionView = (props: TransactionViewProps) => {
  const [prompt, setPrompt] = useState('')

  const {
    refetch: getTransactionData,
    data,
    isSuccess,
    error,
    isFetching,
  } = useGetTransactionData(prompt)

  const handleSubmit = () => {
    getTransactionData()
  }

  return (
    <Container sx={{ height: '100%', p: { xs: 0, sm: 'initial' } }}>
      <Stack
        spacing={4}
        sx={{ maxWidth: 700, height: '100%' }}
        justifyContent='flex-end'
      >
        <Collapse in={Boolean(data?.data)} unmountOnExit>
          <TransactionRegistryTable
            handleCloseDialog={props.handleCloseDialog}
            data={data?.data}
            isSuccess={isSuccess}
            error={error}
          />
        </Collapse>

        <BottomDrawerInput
          value={prompt}
          setValue={setPrompt}
          handleSubmit={handleSubmit}
          isPending={isFetching}
        />
      </Stack>
    </Container>
  )
}
