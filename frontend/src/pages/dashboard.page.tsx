import { Stack } from '@mui/material'
import { useGetCurrentTotalExpense } from '../modules/expenses/expense.query'
import Amount from '../modules/layout/amount'
import Layout from '../modules/layout/layout'
import { TransactionView } from '../modules/transactions/components/transaction.view'
import Typography from '@mui/material/Typography'

const DashboardPage = () => {
  const { data } = useGetCurrentTotalExpense()

  return (
    <Layout>
      <Stack spacing={2}>
        <Stack>
          <Typography variant='caption' color='grey.400'>
            Total Expense
          </Typography>
          <Amount variant='h5' fontWeight={600}>
            {data ?? ''}
          </Amount>
        </Stack>
        <TransactionView />
      </Stack>
    </Layout>
  )
}

export default DashboardPage
