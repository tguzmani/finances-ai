import { Skeleton, Stack, Typography } from '@mui/material'
import { useGetCurrentTotalExpense, useGetTodayExpense } from './expense.query'
import Amount from '../layout/amount'
import Hideable from '../layout/hideable'
import amount from '../../util/amount'

const CurrentTotalExpense = () => {
  const { data: currentTotalExpense } = useGetCurrentTotalExpense()
  const { data: todayExpense } = useGetTodayExpense()

  if (!currentTotalExpense || !todayExpense)
    return (
      <Stack spacing={1}>
        <Skeleton width='25%' animation='wave' variant='text' />
        <Skeleton width='40%' animation='wave' variant='rounded' />
        <Skeleton width='45%' animation='wave' variant='text' />
      </Stack>
    )

  const expenseDifferenceAbs = amount(Math.abs(todayExpense.expenseDifference))

  return (
    <Stack>
      <Typography variant='body2' gutterBottom>
        Total Expense
      </Typography>
      <Amount variant='h4' fontWeight={600}>
        {currentTotalExpense ?? ''}
      </Amount>

      <Stack direction='row' alignItems='center' spacing={0.5}>
        <Typography variant='body2'>Today Expense</Typography>
        <Hideable variant='body2' color='grey.400'>
          <Amount variant='body2' fontWeight={600}>
            {todayExpense.totalExpense ?? ''}
          </Amount>

          <Typography variant='body2' fontWeight={600}>
            (
            {todayExpense.expenseDifference > 0
              ? '+'
              : todayExpense.expenseDifference === 0
              ? ''
              : '–'}
            ${expenseDifferenceAbs})
          </Typography>
        </Hideable>
      </Stack>
    </Stack>
  )
}

export default CurrentTotalExpense
