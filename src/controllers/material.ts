import { Request, Response } from 'express'
import { prisma } from '..'

export const allMaterials = async (request: Request, response: Response) => {
  const count = await prisma.material.count()
  const material = await prisma.material.findMany({
    skip: Number(request.query.skip) || 0,
    take: 5,
  })

  response
    .status(200)
    .json({ success: true, status: 200, object: material, count: count })
}

export const getMaterialById = async (request: Request, response: Response) => {
  const { id } = request.params
  const material = await prisma.material.findFirst({
    where: { id: Number(id) },
  })

  response.status(200).json({ success: true, status: 200, object: material })
}

export const createMaterial = async (request: Request, response: Response) => {
  const material = await prisma.material.create({
    data: request.body,
  })

  response.status(201).json({ success: true, status: 201, object: material })
}

export const deleteMaterial = async (request: Request, response: Response) => {
  const { id } = request.params

  await prisma.material.delete({ where: { id: Number(id) } })

  response.status(200).json({ success: true })
}

export const updateMaterial = async (request: Request, response: Response) => {
  const { id } = request.params

  const material = await prisma.material.update({
    where: { id: Number(id) },
    data: request.body,
  })

  response.status(200).json({ success: true, status: 200, object: material })
}
