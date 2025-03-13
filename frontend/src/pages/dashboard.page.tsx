import { Stack } from '@mui/material'
import Layout from '../modules/layout/layout'
import CurrentTotalExpense from '../modules/expense/current-total-expense'
import AccountsOverview from '../modules/account/accounts-overview'
import ExchangeRatesOverview from '../modules/exchange-rate/exchange-rates-overview'
import CreateTransactionDialog from '../modules/transaction/create-transaction.dialog'

const DashboardPage = () => {
  return (
    <Layout>
      <Stack spacing={4}>
        <CurrentTotalExpense />

        <ExchangeRatesOverview />

        <AccountsOverview />

        <CreateTransactionDialog />
      </Stack>
    </Layout>
  )
}

export default DashboardPage
