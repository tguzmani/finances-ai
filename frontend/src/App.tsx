import { ThemeProvider } from '@emotion/react'
import './App.css'
import { TransactionView } from './modules/transactions/components/transaction.view'
import { createTheme, CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TransactionView />
    </ThemeProvider>
  )
}

export default App
