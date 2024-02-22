import { Router } from 'express'
import authMiddleware from '../middlewares/auth'
import {
  allOrders,
  createOrder,
  deleteOrder,
  showOrder,
  updateOrder,
} from '../controllers/order'
import { errorHandler } from '../utils/error-handle'

const orderRoutes: Router = Router()

orderRoutes.post('/', createOrder)
orderRoutes.get('/', [authMiddleware], errorHandler(allOrders))
orderRoutes.get('/:id', [authMiddleware], errorHandler(showOrder))
orderRoutes.delete('/:id', [authMiddleware], errorHandler(deleteOrder))
orderRoutes.put('/:id', [authMiddleware], errorHandler(updateOrder))

export default orderRoutes
