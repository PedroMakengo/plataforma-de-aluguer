import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets'
import { prisma } from '..'
import { User } from '@prisma/client'

declare module 'express' {
  export interface Request {
    user?: User
  }
}

const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //1. extract the token from header
  const token: string = request.headers.authorization as any
  //2. if token is not present, throw an of unauthorized
  if (!token) {
    response.json({ message: 'Unauthorized', status: 401 })
  }
  try {
    //3. if the token is present, verify that token and extract he payload
    const payload: { userId: number } = jwt.verify(token, JWT_SECRET) as any
    //4. to get the user from the payload
    const user: User = (await prisma.user.findFirst({
      where: { id: payload.userId },
    })) as any

    if (!user) {
      response.json({ message: 'Unauthorized', status: 401 })
    }
    //5. to attach the user to the current request object
    request.user = user
    next()
  } catch (error) {
    response.json({ message: 'Unauthorized', status: 401 })
  }
}

export default authMiddleware
