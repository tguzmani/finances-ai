import { Router } from 'express'
import {
  createTransactionData,
  saveTransactionData,
} from '../controllers/transaction.controller'

const router = Router()

router.post('/create-transaction-data', createTransactionData)
router.post('/save-transaction-data', saveTransactionData)

export default router
