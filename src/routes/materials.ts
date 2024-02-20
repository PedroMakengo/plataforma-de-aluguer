import { Router } from 'express'
import authMiddleware from '../middlewares/auth'
import { errorHandler } from '../error-handle'
import {
  allMaterials,
  createMaterial,
  deleteMaterial,
  getMaterialById,
  updateMaterial,
} from '../controllers/material'

const materialRoutes: Router = Router()

materialRoutes.post('/', [authMiddleware], errorHandler(createMaterial))
materialRoutes.get('/', [authMiddleware], errorHandler(allMaterials))
materialRoutes.get('/:id', [authMiddleware], errorHandler(getMaterialById))
materialRoutes.delete('/:id', [authMiddleware], errorHandler(deleteMaterial))
materialRoutes.put('/:id', [authMiddleware], errorHandler(updateMaterial))

export default materialRoutes
