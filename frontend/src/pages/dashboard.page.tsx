import { Stack } from '@mui/material'
import Layout from '../modules/layout/layout'
import { TransactionView } from '../modules/transactions/components/transaction.view'
import CurrentTotalExpense from '../modules/expenses/current-total-expense'

const DashboardPage = () => {
  return (
    <Layout>
      <Stack spacing={2}>
        <CurrentTotalExpense />
        {false && <TransactionView />}
      </Stack>
    </Layout>
  )
}

export default DashboardPage
