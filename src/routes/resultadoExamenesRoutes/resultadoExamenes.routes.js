import { Router } from 'express'
import {
  getAllResultados,
  getResultadoByAlumnoId,
  createResultado,
  updateResultadoByExamenId,
  deleteResultadoByExamenId
} from '../../controllers/resultadoExamenes.controller.js'

const router = Router()

router
  .get('/', getAllResultados)

  .get('/:idAlumno', getResultadoByAlumnoId)

  .post('/', createResultado)

  .patch('/:idExamen', updateResultadoByExamenId)

  .delete('/:idExamen', deleteResultadoByExamenId)

export default router
