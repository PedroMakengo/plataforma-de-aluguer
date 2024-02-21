import { PrismaClient } from '@prisma/client'
import express from 'express'
import router from './routes'

const app = express()
app.use(express.json())
app.use('/api', router)

export const prisma = new PrismaClient({
  log: ['query'],
})

app.listen(3000, () => console.log('Server running 3000'))
