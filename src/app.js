import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import v1CursosRouter from './routes/cursosRoutes/cursos.routes.js'
import v1ResultadoExamenes from './routes/resultadoExamenesRoutes/resultadoExamenes.routes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

const API_PREFIX = 'api'

app.use(`/${API_PREFIX}/v1/cursos`, v1CursosRouter)
app.use(`/${API_PREFIX}/v1/resultados`, v1ResultadoExamenes)

// rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send({ message: 'pagina no encontrada' })
})

export default app
