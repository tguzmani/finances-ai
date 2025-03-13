import { Stack, StackProps, Typography, TypographyProps } from '@mui/material'

interface IndicatorProps {
  label: string
  value: string
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

      <Typography variant='caption' {...props?.slotProps?.valueTypographyProps}>
        {props.value}
      </Typography>
    </Stack>
  )
}

export default Indicator
