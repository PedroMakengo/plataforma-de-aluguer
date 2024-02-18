import { NextFunction, Request, Response } from 'express'

const adminMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.user as any

  if (user.role === 'ADMIN') {
    next()
  } else {
    next(response.json({ message: 'Unauthorized', status: 401 }))
  }
}

export default adminMiddleware
