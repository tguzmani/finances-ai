// transaction.view.tsx
import { useState } from 'react'
import { Stack, Container, Collapse, Box } from '@mui/material'
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
        spacing={4}
        sx={{ maxWidth: 700, height: '100%' }}
        justifyContent='flex-end'
      >
        <Collapse in={Boolean(data?.data)}>
          <Box sx={{ flexGrow: 1 }}>
            <TransactionRegistryTable
              handleCloseDialog={props.handleCloseDialog}
              data={data?.data}
              isSuccess={isSuccess}
              error={error}
            />
          </Box>
        </Collapse>

        <Box>
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            handleSubmit={handleSubmit}
            isPending={isFetching}
          />
        </Box>
      </Stack>
    </Container>
  )
}
