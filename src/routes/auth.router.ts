import { Router } from 'express'
import { login, me, signup } from '../controllers/auth'
import authMiddleware from '../middlewares/auth'
import { errorHandler } from '../utils/error-handle'

const authRoutes: Router = Router()

authRoutes.post('/signup', errorHandler(signup))
authRoutes.post('/login', errorHandler(login))
authRoutes.get('/me', [authMiddleware], errorHandler(me))

export default authRoutes

// makengo#07
