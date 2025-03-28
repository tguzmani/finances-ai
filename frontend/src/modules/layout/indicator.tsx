import {
  Skeleton,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import { ReactNode } from 'react'

interface IndicatorProps {
  label: string
  value: string | ReactNode
  loading?: boolean
  slotProps?: {
    labelTypographyProps?: TypographyProps
    valueTypographyProps?: TypographyProps
    stackProps?: StackProps
  }
}

const Indicator = (props: IndicatorProps) => {
  return (
    <Stack key={props.label} {...props?.slotProps?.stackProps}>
      <Typography
        variant='caption'
        color='grey.600'
        lineHeight={0.95}
        {...props?.slotProps?.labelTypographyProps}
      >
        {props.label}
      </Typography>

      {props.loading ? (
        <Skeleton variant='text' width={40} animation='wave' />
      ) : typeof props.value === 'string' ? (
        <Typography
          variant='caption'
          {...props?.slotProps?.valueTypographyProps}
        >
          {props.value}
        </Typography>
      ) : (
        props.value
      )}
    </Stack>
  )
}

export default Indicator
