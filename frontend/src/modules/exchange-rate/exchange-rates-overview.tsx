import { IconButton, Skeleton, Stack } from '@mui/material'
import { useGetExchangeRatesOverview } from './exchange-rate.query'
import Indicator from '../layout/indicator'
import amount from '../../util/amount'
import RefreshIcon from '@mui/icons-material/Refresh'

const ExchangeRatesOverview = () => {
  const { data: exchangeRatesOverview } = useGetExchangeRatesOverview()

  if (!exchangeRatesOverview)
    return (
      <Stack
        // bgcolor='red'
        direction='row'
        // spacing={2}
        justifyContent='space-between'
      >
        <Skeleton variant='rounded' width={70} height={40} />
        <Skeleton variant='rounded' width={70} height={40} />
        <Skeleton variant='rounded' width={70} height={40} />
        <Skeleton variant='rounded' width={70} height={40} />
      </Stack>
    )

  const indicatorSlotProps: any = {
    valueTypographyProps: {
      variant: 'body2',
    },
    labelTypographyProps: {
      lineHeight: 1.5,
    },
    stackProps: {
      width: 100,
    },
  }

  return (
    <Stack direction='row' spacing={2} justifyContent='space-between'>
      <Indicator
        label='BCV'
        value={`${amount(exchangeRatesOverview.bcvExchangeRate)} Bs/$`}
        slotProps={indicatorSlotProps}
      />

      <Indicator
        label='BLK'
        value={`${amount(exchangeRatesOverview.vesUsdExchangeRate)} Bs/$`}
        slotProps={indicatorSlotProps}
      />

      <Indicator
        label='DIF'
        value={`${exchangeRatesOverview.exchangeVariation.toFixed(2)}%`}
        slotProps={indicatorSlotProps}
      />

      <IconButton size='small' disabled>
        <RefreshIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Stack>
  )
}

export default ExchangeRatesOverview
