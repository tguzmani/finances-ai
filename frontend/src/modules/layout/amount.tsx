import { Typography, TypographyProps } from '@mui/material'
import { useVisibilityStore } from '../../visibility.store'

interface AmountProps extends TypographyProps {
  children: React.ReactNode
}

const Amount = ({ children, ...props }: AmountProps) => {
  const { visibility } = useVisibilityStore()

  return (
    <Typography {...props}>{visibility ? `$${children}` : '******'}</Typography>
  )
}

export default Amount
