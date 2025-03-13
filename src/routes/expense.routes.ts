import { Router } from 'express'
import {
  getCurrentTotalExpense,
  getTodayExpense,
} from '../controllers/expense.controller'

const router = Router()

router.get('/current-total-expense', getCurrentTotalExpense)
router.get('/today-expense', getTodayExpense)

export default router
