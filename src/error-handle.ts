import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export const errorHandler = (method: Function) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await method(request, response, next)
    } catch (error: any) {
      let exception: any
      if (error) {
        exception = response.json({ message: error })
      } else {
        if (error instanceof ZodError) {
          exception = response.json({
            message: 'Unprocessable entity',
            status: 422,
          })
        } else {
          response.json({ message: 'Something went wrong', status: 500 })
        }
      }
      next(exception)
    }
  }
}
