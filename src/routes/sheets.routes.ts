import { Router } from 'express'
import { testSheetsConnection } from '../controllers/sheets.controller'

const router = Router()

router.get('/test-sheets', testSheetsConnection)

export default router
