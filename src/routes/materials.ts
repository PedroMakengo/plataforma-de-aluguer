import { Router } from 'express'
import authMiddleware from '../middlewares/auth'
import {
  allMaterials,
  createMaterial,
  deleteMaterial,
  getMaterialById,
  updateMaterial,
} from '../controllers/material'
import { errorHandler } from '../utils/error-handle'

const materialRoutes: Router = Router()

materialRoutes.post('/', [authMiddleware], errorHandler(createMaterial))
materialRoutes.get('/', [authMiddleware], errorHandler(allMaterials))
materialRoutes.get('/:id', [authMiddleware], errorHandler(getMaterialById))
materialRoutes.delete('/:id', [authMiddleware], errorHandler(deleteMaterial))
materialRoutes.put('/:id', [authMiddleware], errorHandler(updateMaterial))

export default materialRoutes
