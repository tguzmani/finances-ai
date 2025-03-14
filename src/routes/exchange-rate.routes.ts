import { Router } from 'express'
import {
  getExchangeRateOverview,
  updateExchangeRate,
} from '../controllers/exchange-rate.controller'

const router = Router()

router.get('/overview', getExchangeRateOverview)
router.put('/vesusd', updateExchangeRate)

export default router
