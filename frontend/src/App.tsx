import { ThemeProvider } from '@emotion/react'
import './App.css'
import { createTheme, CssBaseline } from '@mui/material'
import DashboardPage from './pages/dashboard.page'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },

  typography: {
    fontFamily: 'IBM Plex Sans, sans-serif',

    overline: {
      textTransform: 'none',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardPage />
    </ThemeProvider>
  )
}

export default App
