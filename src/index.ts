import { PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
app.use(express.json())

export const prisma = new PrismaClient({
  log: ['query'],
})

app.listen(3000, () => console.log('Server running 3000'))
