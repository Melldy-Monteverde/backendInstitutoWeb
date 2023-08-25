import { Router } from 'express'
import { getAllCursos, getCursoById, createCurso, updateCursoById, deleteCursoById } from '../../controllers/cursos.controller.js'

const router = Router()

router
  .get('/', getAllCursos)

  .get('/:idCurso', getCursoById)

  .post('/', createCurso)

  .patch('/:idCurso', updateCursoById)

  .delete('/:idCurso', deleteCursoById)

export default router
