import { Request, Response } from 'express'
import { prisma } from '..'

export const allOrdersItem = async (request: Request, response: Response) => {
  const orderItem = await prisma.orderItem.findMany({
    include: {
      user: true,
      order: true,
    },
  })

  response.status(200).json({
    success: true,
    status: 200,
    object: orderItem,
  })
}

export const showOrderItem = async (request: Request, response: Response) => {
  const { id } = request.params

  const orderItem = await prisma.orderItem.findFirst({
    where: {
      id: Number(id),
    },
  })

  response.status(200).json({
    success: true,
    status: 200,
    object: orderItem,
  })
}

export const deleteOrderItem = async (request: Request, response: Response) => {
  const { id } = request.params
  await prisma.orderItem.delete({
    where: {
      id: Number(id),
    },
  })

  response.status(200).json({
    success: true,
    status: 200,
  })
}

export const updateOrderItem = async (request: Request, response: Response) => {
  const data = request.body
  const { id } = request.params

  const orderItem = await prisma.orderItem.update({
    where: {
      id: Number(id),
    },
    data,
  })

  response.status(200).json({
    success: true,
    status: 200,
    object: orderItem,
  })
}
