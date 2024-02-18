import { Router } from 'express'

const usersRoutes = Router()

usersRoutes.post('/')
usersRoutes.get('/')
usersRoutes.get('/:id')
usersRoutes.put('/:id')
usersRoutes.delete('/:id')

export default usersRoutes
