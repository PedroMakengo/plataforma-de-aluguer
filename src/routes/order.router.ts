import { Router } from 'express'
import authMiddleware from '../middlewares/auth'
import {
  allOrders,
  changeStatusOrder,
  createOrder,
  deleteOrder,
  showOrder,
  updateOrder,
} from '../controllers/order'
import { errorHandler } from '../utils/error-handle'
import adminMiddleware from '../middlewares/admin'

const orderRoutes: Router = Router()

orderRoutes.post('/', [authMiddleware], errorHandler(createOrder))
orderRoutes.get('/', [authMiddleware], errorHandler(allOrders))
orderRoutes.put(
  '/:id/status',
  [authMiddleware, adminMiddleware],
  errorHandler(changeStatusOrder)
)
orderRoutes.get('/:id', [authMiddleware], errorHandler(showOrder))
orderRoutes.delete('/:id', [authMiddleware], errorHandler(deleteOrder))
orderRoutes.put('/:id', [authMiddleware], errorHandler(updateOrder))

export default orderRoutes
