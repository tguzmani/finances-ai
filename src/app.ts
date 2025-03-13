import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import transactionRoutes from './routes/transaction.routes'
import expenseRoutes from './routes/expense.routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

// Routes
app.use('/api/transactions', transactionRoutes)
app.use('/api/expenses', expenseRoutes)

// Serve frontend static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/dist'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

export default app
