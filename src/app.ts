import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import transactionRoutes from './routes/transaction.routes'
import sheetsTestRoutes from './routes/sheets.routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

// Serve frontend static files
const frontendPath = path.join(__dirname, '../frontend/dist')

app.use(express.static(frontendPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

// Routes
app.use('/api', transactionRoutes)
app.use('/api', sheetsTestRoutes)

export default app
