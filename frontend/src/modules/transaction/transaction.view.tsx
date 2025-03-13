// transaction.view.tsx
import { useState } from 'react'
import { Stack, Container, Collapse, Paper } from '@mui/material'
import { PromptForm } from './prompt.form'
import { TransactionRegistryTable } from './transaction-registry.table'
import { useGetTransactionData } from './transaction.query'

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
        spacing={2}
        sx={{ maxWidth: 700, height: '100%' }}
        justifyContent='flex-end'
      >
        <Collapse in={Boolean(data?.data)}>
          <Paper sx={{ borderRadius: 2, p: 2, flexGrow: 1 }}>
            <TransactionRegistryTable
              handleCloseDialog={props.handleCloseDialog}
              data={data?.data}
              isSuccess={isSuccess}
              error={error}
            />
          </Paper>
        </Collapse>

        <Paper sx={{ borderRadius: 2, p: 2 }}>
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            handleSubmit={handleSubmit}
            isPending={isFetching}
          />
        </Paper>
      </Stack>
    </Container>
  )
}
