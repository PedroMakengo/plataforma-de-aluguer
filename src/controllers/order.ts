import { Request, Response } from 'express'
import { prisma } from '..'

export const createOrder = async (request: Request, response: Response) => {
  const { userId, dateOfOrder, status } = request.body

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  if (!user) {
    response
      .status(404)
      .json({ message: 'Este usuário não existe', success: false, status: 404 })
  }

  const order = await prisma.order.create({
    data: {
      userId,
      dateOfOrder,
      status,
    },
  })

  response.status(201).json({
    success: true,
    status: 201,
    object: order,
  })
}

export const changeStatusOrder = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params
  const { status } = request.body

  const statusChange = await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: status,
  })

  response
    .status(200)
    .json({ success: true, status: 200, object: statusChange })
}

export const allOrders = async (request: Request, response: Response) => {
  const count = await prisma.order.count()
  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
  })

  response
    .status(200)
    .json({ success: true, status: 200, object: orders, count: count })
}

export const showOrder = async (request: Request, response: Response) => {
  const { id } = request.params
  const order = await prisma.order.findFirst({
    where: {
      id: Number(id),
    },
  })

  response.status(200).json({ success: true, status: 200, object: order })
}

export const deleteOrder = async (request: Request, response: Response) => {
  const { id } = request.params

  await prisma.order.delete({ where: { id: Number(id) } })

  response.status(200).json({ success: true, status: 200 })
}

export const updateOrder = async (request: Request, response: Response) => {
  const data = request.body
  const { id } = request.params

  const order = await prisma.order.update({
    where: {
      id: Number(id),
    },
    data,
  })
  response.status(200).json({ success: true, status: 200, object: order })
}
