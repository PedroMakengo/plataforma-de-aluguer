import { Router } from 'express'
import authMiddleware from '../middlewares/auth'
import { errorHandler } from '../utils/error-handle'
import {
  allOrdersItem,
  deleteOrderItem,
  showOrderItem,
  updateOrderItem,
} from '../controllers/ordersItem'

export const ordersItemRoutes: Router = Router()

ordersItemRoutes.get('/', [authMiddleware], errorHandler(allOrdersItem))
ordersItemRoutes.get('/:id', [authMiddleware], errorHandler(showOrderItem))
ordersItemRoutes.delete('/:id', [authMiddleware], errorHandler(deleteOrderItem))
ordersItemRoutes.put('/:id', [authMiddleware], errorHandler(updateOrderItem))
