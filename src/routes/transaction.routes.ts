import { Router } from 'express'
import {
  getTransactionData,
  saveTransactionData,
} from '../controllers/transaction.controller'

const router = Router()

router.post('/transaction-data', getTransactionData)
router.post('/save-transaction-data', saveTransactionData)

export default router
