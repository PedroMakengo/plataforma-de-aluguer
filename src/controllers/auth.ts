import { Request, Response } from 'express'
import { prisma } from '..'
import { compareSync, hashSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../secrets'
import { SignupUserSchema } from '../validators/auth'

export const signup = async (request: Request, response: Response) => {
  // Validação do meu body
  SignupUserSchema.parse(request.body)

  const { email, password, name } = request.body

  // Verificar se existe um user
  let user = await prisma.user.findFirst({
    where: { email },
  })

  if (user) {
    response.json({ message: 'Já existe um user com este e-mail', status: 409 })
  }

  user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  })

  response.json({ success: true, status: 201, object: user })
}

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body

  let user = (await prisma.user.findFirst({ where: { email } })) as any

  // Verificar o user
  if (!user) {
    response.status(404).json({
      message: 'Usuário não existe!',
      status: 404,
      success: false,
    })
  }

  // Comparar as senhas
  if (!compareSync(password, user?.password)) {
    response
      .status(404)
      .json({ message: 'Senha incorreta', status: 404, success: false })
  }

  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET
  )

  response.json({ token, user })
}

export const me = async (request: Request, response: Response) => {
  response.json(request.user)
}
