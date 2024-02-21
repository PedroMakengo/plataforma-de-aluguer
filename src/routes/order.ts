import { Router } from 'express'
import authMiddleware from '../middlewares/auth'
import { errorHandler } from '../error-handle'
import {
  allOrders,
  createOrder,
  deleteOrder,
  showOrder,
  updateOrder,
} from '../controllers/order'

const orderRoutes: Router = Router()

orderRoutes.get('/', [authMiddleware], errorHandler(allOrders))
orderRoutes.post('/', [authMiddleware], errorHandler(createOrder))
orderRoutes.get('/:id', [authMiddleware], errorHandler(showOrder))
orderRoutes.delete('/:id', [authMiddleware], errorHandler(deleteOrder))
orderRoutes.put('/:id', [authMiddleware], errorHandler(updateOrder))

export default orderRoutes
