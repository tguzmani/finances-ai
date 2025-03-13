import { Router } from 'express'
import {
  getCurrentTotalExpense,
  getExpenseStatus,
  getTodayExpense,
} from '../controllers/expense.controller'

const router = Router()

router.get('/current-total-expense', getCurrentTotalExpense)
router.get('/today-expense', getTodayExpense)
router.get('/expense-status', getExpenseStatus)

export default router
