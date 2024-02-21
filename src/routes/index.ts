import { Router } from 'express'
import authRoutes from './auth'
import usersRoutes from './users'
import materialRoutes from './materials'
import orderRoutes from './order'

const router: Router = Router()

router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/material', materialRoutes)
router.use('/orders', orderRoutes)

export default router
