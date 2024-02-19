import { Request, Response } from 'express'
import { prisma } from '..'

// USERS
export const listAllUsers = async (request: Request, response: Response) => {
  const count = await prisma.user.count()
  const users = await prisma.user.findMany({
    skip: Number(request.query.skip) || 0,
    take: 5,
    include: {
      address: true,
    },
  })

  response
    .status(200)
    .json({ object: users, count: count, status: 200, success: true })
}

export const deleteUser = async (request: Request, response: Response) => {
  const user = await prisma.user.delete({
    where: {
      id: Number(request.params.id),
    },
  })

  response.status(200).json({ success: true, status: 200, object: user })
}

export const updateUser = async (request: Request, response: Response) => {
  let user = await prisma.user.findFirstOrThrow({
    where: {
      id: Number(request.params.id),
    },
  })

  if (!user) {
    response.status(404).json({
      message: 'Não existe user com este id',
      success: false,
      status: 404,
    })
  }

  user = await prisma.user.update({
    where: {
      id: user.id,
    },

    data: request.body,
  })

  response.status(200).json({ success: true, status: 200, object: user })
}

export const getUserById = async (request: Request, response: Response) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: Number(request.params.id),
    },
  })

  response.status(200).json({ success: true, status: 200, object: user })
}

// ADDRESS
export const createAddress = async (request: Request, response: Response) => {
  const { id } = request.params

  // Verificar se existe um usuário com este id
  const user = await prisma.user.findFirst({
    where: { id: Number(id) },
  })

  if (!user) {
    response.status(404).json({
      message: 'Não existe um usuário com este id',
      success: false,
      status: 404,
    })
  }

  const dataAddress = {
    ...request.body,
    userId: Number(id),
  }

  const address = await prisma.address.create({
    data: dataAddress,
  })

  response.status(201).json({ success: true, status: 201, object: address })
}

export const listAllAddresses = async (
  request: Request,
  response: Response
) => {
  // console.log('Hello World')
  const count = await prisma.address.count()
  const addresses = await prisma.address.findMany({
    skip: Number(request.query.skip) || 0,
    take: 5,
    include: {
      user: true,
    },
  })
  response
    .status(200)
    .json({ success: true, count: count, status: 200, object: addresses })
}

export const deleteUserAddress = async (
  request: Request,
  response: Response
) => {
  const address = await prisma.address.delete({
    where: {
      id: Number(request.params.id),
    },
  })

  response.status(200).json({ success: true, status: 200, object: address })
}

export const getUserAddressById = async (
  request: Request,
  response: Response
) => {
  const address = await prisma.address.findFirstOrThrow({
    where: { id: Number(request.params.id) },
  })

  response.status(200).json({ success: true, status: 200, object: address })
}
