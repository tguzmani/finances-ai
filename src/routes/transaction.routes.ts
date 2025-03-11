import { Router } from 'express'
import { addTransaction } from '../controllers/transaction.controller'

const router = Router()

router.post('/add-transaction', addTransaction)

export default router
