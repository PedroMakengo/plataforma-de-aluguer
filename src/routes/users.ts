import { Router } from 'express'
import authMiddleware from '../middlewares/auth'
import adminMiddleware from '../middlewares/admin'
import { errorHandler } from '../error-handle'
import {
  createAddress,
  deleteUser,
  getUserById,
  listAllUsers,
  updateUser,
  deleteUserAddress,
  listAllAddresses,
} from '../controllers/users'

const usersRoutes = Router()

usersRoutes.get(
  '/',
  [authMiddleware, adminMiddleware],
  errorHandler(listAllUsers)
)
usersRoutes.get('/:id', [authMiddleware], errorHandler(getUserById))
usersRoutes.put('/:id', [authMiddleware], errorHandler(updateUser))
usersRoutes.delete('/:id', [authMiddleware], errorHandler(deleteUser))

// ADDRESS
usersRoutes.post('/:id/address', [authMiddleware], errorHandler(createAddress))
usersRoutes.delete(
  '/:id/address',
  [authMiddleware],
  errorHandler(deleteUserAddress)
)

usersRoutes.get(
  '/address',
  [authMiddleware, adminMiddleware],
  errorHandler(listAllAddresses)
)

export default usersRoutes
