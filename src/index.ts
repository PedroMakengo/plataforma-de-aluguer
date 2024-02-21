import { PrismaClient } from '@prisma/client'
import express from 'express'
import router from './routes'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

const app = express()
export const prisma = new PrismaClient({
  log: ['query'],
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api', router)
app.use(express.json())

app.listen(3000, () => console.log('Server running 3000'))
