// transaction.view.tsx
import { useState } from 'react'
import { Stack, Typography, Paper, Container } from '@mui/material'
import { useAddTransaction } from '../transaction.service'
import { PromptForm } from './prompt.form'
import { TransactionResponse } from './transaction.response'

export const TransactionView = () => {
  const { mutate, data, isPending, isSuccess, error } = useAddTransaction()
  const [prompt, setPrompt] = useState('')

  const handleSubmit = () => mutate(prompt)

  return (
    <Container>
      <Stack spacing={4} sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
        <Typography variant='h4' align='center'>
          Finances AI
        </Typography>

        <Paper elevation={2} sx={{ p: 3 }}>
          <TransactionResponse
            data={data?.data}
            isSuccess={isSuccess}
            error={error}
          />
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <PromptForm
            isSuccess={isSuccess}
            prompt={prompt}
            setPrompt={setPrompt}
            handleSubmit={handleSubmit}
            isPending={isPending}
          />
        </Paper>
      </Stack>
    </Container>
  )
}
