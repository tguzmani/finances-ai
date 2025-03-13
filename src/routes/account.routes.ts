import { Router } from 'express'
import { getAccountsOverview } from '../controllers/account.controller'

const router = Router()

router.get('/overview', getAccountsOverview)

export default router
