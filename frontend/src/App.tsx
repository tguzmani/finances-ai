import { ThemeProvider } from '@emotion/react'
import './App.css'
import { TransactionView } from './modules/transactions/components/transaction.view'
import { createTheme, CssBaseline } from '@mui/material'
import Layout from './modules/layout/layout'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },

  typography: {
    fontFamily: 'IBM Plex Sans, sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <TransactionView />
      </Layout>
    </ThemeProvider>
  )
}

export default App
