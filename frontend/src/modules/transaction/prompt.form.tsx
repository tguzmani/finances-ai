import { Button, TextField, Stack } from '@mui/material'
import { FormEvent } from 'react'

interface PromptFormProps {
  prompt: string
  setPrompt: (prompt: string) => void
  handleSubmit: () => void
  isPending: boolean
}

export const PromptForm = ({
  prompt,
  setPrompt,
  handleSubmit,
  isPending,
}: PromptFormProps) => {
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
        placeholder='Enter your transaction'
        value={prompt}
        multiline
        rows={4}
        slotProps={{
          input: { sx: { p: 1, fontSize: 14, bgcolor: 'background.default' } },
        }}
        onChange={e => setPrompt(e.target.value)}
        fullWidth
        required
      />

      <Button
        variant='contained'
        type={'submit'}
        disabled={isPending || prompt === ''}
        loading={isPending}
        onClick={handleSubmit}
      >
        {'Submit'}
      </Button>

      {/* add a clear button */}
      <Button
        variant='text'
        type='button'
        disabled={isPending || prompt === ''}
        onClick={handleClearPrompt}
      >
        Clear
      </Button>
    </Stack>
  )
}
