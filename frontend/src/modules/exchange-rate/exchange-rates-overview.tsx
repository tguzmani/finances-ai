import { IconButton, Skeleton, Stack, Typography } from '@mui/material'
import { useGetExchangeRatesOverview } from './exchange-rate.query'
import Indicator from '../layout/indicator'
import amount from '../../util/amount'

import EditIcon from '@mui/icons-material/Edit'
import UpdateExchangeRateDrawer from './update-exchange-rate.drawer'
import usePortal from '../../hooks/use-portal'

const ExchangeRatesOverview = () => {
  const { data: exchangeRatesOverview, isFetching } =
    useGetExchangeRatesOverview()
  const portalProps = usePortal()

  if (!exchangeRatesOverview)
    return (
      <Stack direction='row' justifyContent='space-between'>
        <Skeleton animation='wave' variant='rounded' width={70} height={40} />
        <Skeleton animation='wave' variant='rounded' width={70} height={40} />
        <Skeleton animation='wave' variant='rounded' width={70} height={40} />
        <Skeleton animation='wave' variant='rounded' width={70} height={40} />
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
    <>
      <UpdateExchangeRateDrawer title='Update VESUSD' {...portalProps} />

      <Stack spacing={2}>
        <Stack
          direction='row'
          alignItems='flex-start'
          justifyContent='space-between'
          spacing={1}
        >
          <Typography variant='body2' color='grey.300'>
            VESUSD Exchange Rates
          </Typography>
          <IconButton size='small' onClick={portalProps.onOpen}>
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>

        <Stack direction='row' spacing={2} justifyContent='space-between'>
          <Indicator
            loading={isFetching}
            label='BCV'
            value={`${amount(exchangeRatesOverview.bcvExchangeRate)} Bs/$`}
            slotProps={indicatorSlotProps}
          />

          <Indicator
            loading={isFetching}
            label='BLK'
            value={`${amount(exchangeRatesOverview.vesUsdExchangeRate)} Bs/$`}
            slotProps={indicatorSlotProps}
          />

          <Indicator
            loading={isFetching}
            label='DIF'
            value={`${exchangeRatesOverview.exchangeVariation.toFixed(2)}%`}
            slotProps={indicatorSlotProps}
          />
        </Stack>
      </Stack>
    </>
  )
}

export default ExchangeRatesOverview
