import { Router } from 'express'
import {
  autoAdjustBudgetCap,
  getBudgetsOverview,
} from '../controllers/budget.controller'

const router = Router()

router.get('/overview', getBudgetsOverview)
router.post('/auto-adjust', autoAdjustBudgetCap)

export default router
