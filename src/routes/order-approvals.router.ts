import { Router } from 'express'
import authMiddleware from '../middlewares/auth'
import { errorHandler } from '../utils/error-handle'
import {
  allOrderApprovals,
  createOrderApprovals,
  showOrderApprovals,
  updateOrderApprovals,
} from '../controllers/orderApprovals'

const orderApprovalsRoutes: Router = Router()

orderApprovalsRoutes.post(
  '/',
  [authMiddleware],
  errorHandler(createOrderApprovals)
)
orderApprovalsRoutes.get('/', [authMiddleware], errorHandler(allOrderApprovals))
orderApprovalsRoutes.get(
  '/:id',
  [authMiddleware],
  errorHandler(showOrderApprovals)
)
orderApprovalsRoutes.put(
  '/:id',
  [authMiddleware],
  errorHandler(updateOrderApprovals)
)

export default orderApprovalsRoutes
