import { Request, Response } from 'express'
import { prisma } from '..'

export const allOrders = async (request: Request, response: Response) => {}

export const showOrder = async (request: Request, response: Response) => {}

export const deleteOrder = async (request: Request, response: Response) => {}

export const updateOrder = async (request: Request, response: Response) => {}

export const createOrder = async (request: Request, response: Response) => {
  const { userId, dateOfOrder, status } = request.body

  const data = {
    userId,
    dateOfOrder,
    status,
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  if (!user) {
    response.status(404).json({
      success: false,
      status: 404,
    })
  }

  const order = await prisma.order.create({ data })

  response.status(201).json({
    success: true,
    status: 201,
    object: order,
  })
}
