import { Request, Response } from 'express'
import { prisma } from '..'

export const createOrderApprovals = async (
  request: Request,
  response: Response
) => {
  const { userId, orderId, dataOfApprovals } = request.body

  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  })

  if (!user) {
    response.status(404).json({
      success: false,
      status: 404,
      message: 'Não existe usuário com este id',
    })
  }

  const order = await prisma.order.findFirst({
    where: {
      id: Number(orderId),
      userId: Number(user?.id),
    },
  })

  if (!order) {
    response.status(404).json({
      success: false,
      status: 404,
      message: 'Não existe order com este id',
    })
  }

  const orderApprovals = await prisma.orderApprovals.create({
    data: {
      userId: Number(userId),
      orderId: Number(orderId),
      dataOfApprovals,
    },
  })

  response.status(201).json({
    success: true,
    status: 201,
    object: orderApprovals,
  })
}

export const allOrderApprovals = async (
  request: Request,
  response: Response
) => {
  const count = await prisma.orderApprovals.count()
  const orderApprovals = await prisma.orderApprovals.findMany({
    include: {
      user: true,
      order: true,
    },
  })

  response.status(200).json({
    success: true,
    status: 200,
    object: orderApprovals,
    count: count,
  })
}

export const showOrderApprovals = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params

  const orderApprovals = await prisma.orderApprovals.findFirst({
    where: {
      id: Number(id),
    },
  })

  response.status(200).json({
    success: true,
    status: 200,
    object: orderApprovals,
  })
}

export const updateOrderApprovals = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params

  const orderApprovals = await prisma.orderApprovals.update({
    where: {
      id: Number(id),
    },
    data: request.body,
  })

  response.status(200).json({
    success: true,
    status: 200,
    object: orderApprovals,
  })
}
