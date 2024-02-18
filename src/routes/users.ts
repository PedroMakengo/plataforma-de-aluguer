import { Router } from 'express'

export const usersRoutes = Router()

usersRoutes.post('/')
usersRoutes.get('/')
usersRoutes.get('/:id')
usersRoutes.put('/:id')
usersRoutes.delete('/:id')
