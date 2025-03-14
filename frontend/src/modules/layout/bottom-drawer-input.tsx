import {
  TextField,
  Stack,
  IconButton,
  InputAdornment,
  Fade,
} from '@mui/material'
import { FormEvent } from 'react'
import SendIcon from '@mui/icons-material/Send'
import CancelIcon from '@mui/icons-material/Cancel'

interface BottomDrawerInputProps {
  value: string
  setValue: (value: string) => void
  handleSubmit: (e: FormEvent<HTMLElement>) => void
  isPending: boolean
  placeholder?: string
}

export const BottomDrawerInput = ({
  value,
  setValue,
  handleSubmit,
  isPending,
  placeholder,
}: BottomDrawerInputProps) => {
  const handleClearValue = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    setValue('')
  }

  const handleSubmitValue = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <Stack
      component='form'
      spacing={1}
      direction='row'
      alignItems='center'
      onSubmit={handleSubmitValue}
    >
      <TextField
        multiline
        fullWidth
        required
        placeholder={placeholder}
        value={value}
        maxRows={6}
        onChange={e => setValue(e.target.value)}
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
              <Fade in={value !== ''}>
                <InputAdornment position='end'>
                  <IconButton
                    size='small'
                    disabled={isPending || value === ''}
                    onClick={handleClearValue}
                  >
                    <CancelIcon sx={{ color: 'grey.600', fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              </Fade>
            ),
          },
        }}
      />

      <IconButton
        sx={{
          width: 36,
          height: 36,
          bgcolor: 'primary.main',
          '&.Mui-disabled': {
            bgcolor: 'grey.800',
          },
        }}
        size='small'
        type='submit'
        disabled={isPending || value === ''}
        loading={isPending}
        onClick={handleSubmit}
      >
        <SendIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Stack>
  )
}
