import { Stack } from '@mui/material'
import Layout from '../modules/layout/layout'
import { TransactionView } from '../modules/transaction/components/transaction.view'
import CurrentTotalExpense from '../modules/expense/current-total-expense'
import AccountsOverview from '../modules/account/accounts-overview'
import ExchangeRatesOverview from '../modules/exchange-rate/exchange-rates-overview'

const DashboardPage = () => {
  return (
    <Layout>
      <Stack spacing={4}>
        <CurrentTotalExpense />
        <ExchangeRatesOverview />
        <AccountsOverview />
        <TransactionView />
      </Stack>
    </Layout>
  )
}

export default DashboardPage
