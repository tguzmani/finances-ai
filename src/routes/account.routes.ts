import { Router } from 'express'
import * as accountController from '../controllers/account.controller'

const router = Router()

router.get('/overview', accountController.getAccountsOverview)
router.get('/banesco', accountController.getBanescoOverview)
router.post('/banesco/adjust', accountController.adjustBanescoBalance)

export default router
