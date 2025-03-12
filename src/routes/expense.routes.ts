import { Router } from 'express'
import { getCurrentTotalExpense } from '../controllers/expense.controller'

const router = Router()

router.get('/current-total-expense', getCurrentTotalExpense)

export default router
