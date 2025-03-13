import { Typography, TypographyProps } from '@mui/material'
import { useVisibilityStore } from '../../visibility.store'
import amount from '../../util/amount'

interface AmountProps extends TypographyProps {
  children: number
}

const Amount = ({ children, ...props }: AmountProps) => {
  const { visibility } = useVisibilityStore()

  return (
    <Typography {...props}>
      {visibility ? `$${amount(children)}` : '******'}
    </Typography>
  )
}

export default Amount
