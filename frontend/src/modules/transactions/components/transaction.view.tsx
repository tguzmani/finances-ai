// transaction.view.tsx
import { useState } from 'react'
import { Stack, Container, Box } from '@mui/material'
import { useCreateTransactionData } from '../transaction.service'
import { PromptForm } from './prompt.form'
import { TransactionResponse } from './transaction.response'

export const TransactionView = () => {
  const { mutate, data, isPending, isSuccess, error } =
    useCreateTransactionData()
  const [prompt, setPrompt] = useState('')

  const handleSubmit = () => mutate(prompt)

  return (
    <Container sx={{ height: '100%', p: { xs: 0, sm: 'initial' } }}>
      <Stack
        spacing={2}
        sx={{ maxWidth: 700 }}
        justifyContent='space-between'
        p={{ xs: 2, sm: 4 }}
      >
        <Box sx={{ borderRadius: 2, p: 2, bgcolor: 'grey.900', flexGrow: 1 }}>
          <TransactionResponse
            data={data?.data}
            isSuccess={isSuccess}
            error={error}
          />
        </Box>

        <Box sx={{ borderRadius: 2, p: 2, bgcolor: 'grey.900' }}>
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            handleSubmit={handleSubmit}
            isPending={isPending}
          />
        </Box>
      </Stack>
    </Container>
  )
}
