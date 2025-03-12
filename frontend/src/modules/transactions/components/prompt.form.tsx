import { Button, TextField, Stack } from '@mui/material'
import { FormEvent } from 'react'

interface PromptFormProps {
  prompt: string
  setPrompt: (prompt: string) => void
  handleSubmit: () => void
  isPending: boolean
  isSuccess: boolean
}

export const PromptForm = ({
  prompt,
  setPrompt,
  handleSubmit,
  isPending,
  isSuccess,
}: // data,
PromptFormProps) => {
  const handleClearPrompt = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    setPrompt('')
  }

  const handleSendPrompt = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <Stack spacing={2} component='form' onSubmit={handleSendPrompt}>
      <TextField
        label='Transaction Prompt'
        value={prompt}
        multiline
        rows={3}
        onChange={e => setPrompt(e.target.value)}
        fullWidth
        required
      />

      <Button
        variant='contained'
        type={isSuccess && prompt !== '' ? 'button' : 'submit'}
        disabled={isPending}
        loading={isPending}
        onClick={isSuccess && prompt !== '' ? handleClearPrompt : handleSubmit}
      >
        {isSuccess && prompt !== '' ? 'Clear' : 'Submit'}
      </Button>
    </Stack>
  )
}
