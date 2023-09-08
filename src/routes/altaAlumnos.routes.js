import { Router } from 'express'
import {
  getAllAlumnos,
  getAlumnoById,
  createAlumno,
  updateAlumnoById,
  deleteAlumnoById
} from '../controllers/altaAlumnos.controller.js'

const router = Router()

router
  .get('/', getAllAlumnos)

  .get('/:idAlumno', getAlumnoById)

  .post('/', createAlumno)

  .patch('/:idAlumno', updateAlumnoById)

  .delete('/:idAlumno', deleteAlumnoById)

export default router
