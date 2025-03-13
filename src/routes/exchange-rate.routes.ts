import { Router } from 'express'
import { getExchangeRateOverview } from '../controllers/exchange-rate.controller'

const router = Router()

router.get('/overview', getExchangeRateOverview)

export default router
