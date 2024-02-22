import { Request, Response } from 'express'
import { prisma } from '..'

export const allPayments = async (request: Request, response: Response) => {
  const count = await prisma.payments.count()

  const payments = await prisma.payments.findMany({
    include: {
      order: true,
    },
  })

  response.status(200).json({
    success: true,
    status: 200,
    object: payments,
    count,
  })
}

export const showPayment = async (request: Request, response: Response) => {
  const { id } = request.params
  const payment = await prisma.payments.findFirst({
    where: {
      id: Number(id),
    },
  })

  response.status(200).json({
    success: true,
    status: 200,
    object: payment,
  })
}

export const approvalPayment = async (request: Request, response: Response) => {
  const { id } = request.params
  const { status } = request.body

  const order = await prisma.order.findFirst({
    where: {
      id: Number(id),
    },
  })

  if (!order) {
    response.status(404).json({
      success: false,
      status: 404,
      message: 'Não existe order com este id',
    })
  }

  const approvalPayment = await prisma.payments.update({
    where: {
      id: Number(id),
      orderId: Number(order?.id),
    },
    data: {
      status,
    },
  })

  response.status(200).json({
    success: true,
    status: 200,
    object: approvalPayment,
  })
}

export const registerPayment = async (request: Request, response: Response) => {
  const { orderId } = request.body

  const order = await prisma.order.findFirst({
    where: {
      id: Number(orderId),
    },
  })

  if (!order) {
    response.status(404).json({
      success: false,
      status: 404,
      message: 'Não existe order com este id',
    })
  }

  const payments = await prisma.payments.create({
    data: request.body,
  })

  response.status(200).json({
    success: true,
    status: 200,
    object: payments,
  })
}
