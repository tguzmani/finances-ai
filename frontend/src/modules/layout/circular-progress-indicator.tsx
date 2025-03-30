import { Box, CircularProgress } from '@mui/material'

interface CircularProgressIndicatorProps {
  value: number
  size?: number
  thickness?: number
}

export const CircularProgressIndicator = ({
  value,
  size = 40,
  thickness = 4,
}: CircularProgressIndicatorProps) => {
  const normalizedValue = Math.min(value, 100)
  const hasOverflow = value > 100

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      {/* Base track */}
      <CircularProgress
        variant='determinate'
        value={100}
        size={size}
        thickness={thickness}
        sx={{ color: 'grey.200' }}
      />

      {/* Main progress */}
      <CircularProgress
        variant='determinate'
        value={normalizedValue}
        size={size}
        thickness={thickness}
        sx={{
          color: 'primary.main',
          position: 'absolute',
          left: 0,
        }}
      />

      {/* Overflow indicator */}
      {hasOverflow && (
        <CircularProgress
          variant='determinate'
          value={20} // Fixed small segment to indicate overflow
          size={size}
          thickness={thickness}
          sx={{
            color: 'warning.main',
            position: 'absolute',
            left: 0,
            rotate: `${normalizedValue * 3.6}deg`,
          }}
        />
      )}
    </Box>
  )
}
