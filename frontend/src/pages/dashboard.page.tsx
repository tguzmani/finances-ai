import { Divider, Stack, styled } from '@mui/material'
import Layout from '../modules/layout/layout'
import CurrentTotalExpense from '../modules/expense/current-total-expense'
import ExchangeRatesOverview from '../modules/exchange-rate/exchange-rates-overview'
import CreateTransactionDialog from '../modules/transaction/create-transaction.dialog'
import DashboardTabs from '../modules/dashboard/dashboard.tabs'

const FullWidthDivider = styled(Divider)(() => ({
  position: 'relative',
  left: '-16px',
  width: `calc(100vw )`,
}))
const DashboardPage = () => {
  return (
    <Layout>
      <Stack spacing={3} overflow='visible'>
        <CurrentTotalExpense />

        <FullWidthDivider />

        <ExchangeRatesOverview />

        <FullWidthDivider />

        <DashboardTabs />
      </Stack>

      <CreateTransactionDialog />
    </Layout>
  )
}

export default DashboardPage
