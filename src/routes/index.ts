import { Router } from 'express'
import authRoutes from './auth.routes'
// ... other route imports

const router = Router()

router.use('/auth', authRoutes)
// ... other routes

export default router
