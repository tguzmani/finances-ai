import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import './common/dayjs.config'

import transactionRoutes from './routes/transaction.routes'
import expenseRoutes from './routes/expense.routes'
import accountRoutes from './routes/account.routes'
import exchangeRateRoutes from './routes/exchange-rate.routes'
import budgetRoutes from './routes/budget.routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:4300', 'https://192.168.18.166:4300'],
  })
)

// Routes configuration
const routes = [
  { path: 'transactions', router: transactionRoutes },
  { path: 'expenses', router: expenseRoutes },
  { path: 'accounts', router: accountRoutes },
  { path: 'exchange-rates', router: exchangeRateRoutes },
  { path: 'budgets', router: budgetRoutes },
]

// Register all routes with /api prefix
routes.forEach(({ path, router }) => {
  app.use(`/api/${path}`, router)
})

// Serve frontend static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/dist'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

export default app
