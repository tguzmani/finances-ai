import { Typography, TypographyProps } from '@mui/material'
import { useVisibilityStore } from '../../visibility.store'

interface AmountProps extends TypographyProps {
  children: number
}

const Amount = ({ children, ...props }: AmountProps) => {
  const { visibility } = useVisibilityStore()

  return (
    <Typography {...props}>
      {visibility ? `$${children.toFixed(2)}` : '******'}
    </Typography>
  )
}

export default Amount
