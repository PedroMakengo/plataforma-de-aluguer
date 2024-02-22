import { Router } from 'express'
import authRoutes from './auth.router'
import usersRoutes from './users.router'
import materialRoutes from './materials.router'
import orderRoutes from './order.router'
import ordersItemRoutes from './order-item.router'
const router: Router = Router()

router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/material', materialRoutes)
router.use('/orders', orderRoutes)
router.use('/order-item', ordersItemRoutes)

export default router
