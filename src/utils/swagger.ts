import { Express, Request, Response } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rest API Docs',
      version: '1.0.0',
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/index.ts', './src/schema/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

function swaggerDocs(app: Express, port: number) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('docs.json', (request: Request, response: Response) => {
    response.setHeader('Content-Type', 'application/json')
    response.send(swaggerSpec)
  })

  console.log(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs
