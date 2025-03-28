import { Stack, Skeleton, Typography } from '@mui/material'
import { useGetBanescoOverview } from './account.query'
import Indicator from '../layout/indicator'
import Amount from '../layout/amount'

const BanescoOverview = () => {
  const { data: banescoOverview, isFetching } = useGetBanescoOverview()

  if (!banescoOverview)
    return (
      <Stack direction='row' justifyContent='space-between'>
        <Skeleton animation='wave' variant='rounded' width={70} height={40} />
        <Skeleton animation='wave' variant='rounded' width={70} height={40} />
        <Skeleton animation='wave' variant='rounded' width={70} height={40} />
      </Stack>
    )

  const indicatorSlotProps = {
    labelTypographyProps: {
      lineHeight: 1.5,
    },
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction='row'
        alignItems='flex-start'
        justifyContent='space-between'
        spacing={1}
      >
        <Typography variant='body2' color='grey.300'>
          Banesco Overview
        </Typography>
      </Stack>

      <Stack
        direction='row'
        spacing={2}
        justifyContent='space-between'
        width={0.66}
      >
        <Indicator
          loading={isFetching}
          label='USD'
          value={
            <Amount currency='usd' variant='body2'>
              {banescoOverview.usd.balance}
            </Amount>
          }
          slotProps={indicatorSlotProps}
        />

        <Indicator
          loading={isFetching}
          label='VES'
          value={
            <Amount currency='ves' variant='body2'>
              {banescoOverview.ves.balance}
            </Amount>
          }
          slotProps={indicatorSlotProps}
        />
      </Stack>
    </Stack>
  )
}

export default BanescoOverview
