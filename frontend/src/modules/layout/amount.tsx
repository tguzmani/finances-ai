import { Typography, TypographyProps } from '@mui/material'
import { useVisibilityStore } from '../../visibility.store'
import amount from '../../util/amount'

interface AmountProps extends TypographyProps {
  children: number
  currency?: 'ves' | 'usd'
}

const Amount = ({ children, currency = 'usd', ...props }: AmountProps) => {
  const { visibility } = useVisibilityStore()

  const currencySybol = currency === 'ves' ? 'Bs ' : '$'

  return (
    <Typography {...props}>
      {visibility ? `${currencySybol}${amount(children)}` : '******'}
    </Typography>
  )
}

export default Amount
