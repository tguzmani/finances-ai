import { Stack, Typography } from '@mui/material'
import { useGetCurrentTotalExpense, useGetTodayExpense } from './expense.query'
import Amount from '../layout/amount'
import Hideable from '../layout/hideable'

const CurrentTotalExpense = () => {
  const { data: currentTotalExpense } = useGetCurrentTotalExpense()
  const {
    data: { totalExpense, expenseDifference },
  } = useGetTodayExpense()

  const expenseDifferenceAbs = Math.abs(expenseDifference)

  return (
    <Stack>
      <Typography variant='caption' gutterBottom>
        Total Expense
      </Typography>
      <Amount variant='h5' fontWeight={600}>
        {currentTotalExpense ?? ''}
      </Amount>

      <Stack direction='row' alignItems='center' spacing={0.5}>
        <Typography variant='caption'>Today Expense</Typography>
        <Hideable variant='caption' color='grey.400'>
          <Amount variant='caption' fontWeight={600}>
            {totalExpense ?? ''}
          </Amount>

          <Typography variant='caption' fontWeight={600}>
            (
            {expenseDifference > 0
              ? '+'
              : expenseDifferenceAbs === 0
              ? ''
              : '-'}
            ${expenseDifferenceAbs})
          </Typography>
        </Hideable>
      </Stack>
    </Stack>
  )
}

export default CurrentTotalExpense
