import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

import transactionRoutes from './routes/transaction.routes'
import expenseRoutes from './routes/expense.routes'
import accountRoutes from './routes/account.routes'
import exchangeRateRoutes from './routes/exchange-rate.routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

// Routes
app.use('/api/transactions', transactionRoutes)
app.use('/api/expenses', expenseRoutes)
app.use('/api/accounts', accountRoutes)
app.use('/api/exchange-rates', exchangeRateRoutes)

// Serve frontend static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/dist'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

export default app
