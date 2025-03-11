import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import transactionRoutes from './routes/transaction.routes'
import sheetsRoutes from './routes/sheets.routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

// Routes
app.use('/api', transactionRoutes)
app.use('/api', sheetsRoutes)

export default app
