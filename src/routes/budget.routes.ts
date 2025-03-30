import { Router } from 'express'
import budgetController from '../controllers/budget.controller'

const router = Router()

router.get('/overview', budgetController.getBudgetsOverview)

export default router
