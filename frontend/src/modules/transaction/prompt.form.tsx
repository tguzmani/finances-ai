import { TextField, Stack, IconButton, InputAdornment } from '@mui/material'
import { FormEvent } from 'react'
import SendIcon from '@mui/icons-material/Send'
import CancelIcon from '@mui/icons-material/Cancel'

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
    <Stack
      spacing={1}
      direction='row'
      alignItems='center'
      component='form'
      onSubmit={handleSendPrompt}
    >
      <TextField
        multiline
        fullWidth
        required
        placeholder='Enter your transaction'
        value={prompt}
        maxRows={6}
        onChange={e => setPrompt(e.target.value)}
        slotProps={{
          input: {
            sx: {
              p: 1.5,
              fontSize: 14,
              bgcolor: 'background.default',
              '& fieldset': {
                border: 'none',
              },
            },
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  size='small'
                  disabled={isPending || prompt === ''}
                  onClick={handleClearPrompt}
                >
                  <CancelIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <IconButton
        sx={{ width: 36, height: 36, bgcolor: 'red' }}
        size='small'
        type='submit'
        disabled={isPending || prompt === ''}
        loading={isPending}
        onClick={handleSubmit}
      >
        <SendIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Stack>
  )
}
