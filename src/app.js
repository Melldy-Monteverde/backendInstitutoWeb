/* eslint-disable camelcase */
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createPool } from 'mysql2/promise'

const app = express()
const API_PREFIX = 'api'

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}

const queries = {
  // LA BASE POBLADA ES: testing,
  // LA BASE VACIA ES: testing2
  // LA BASE PROD ES: cursos

  getCursos: 'SELECT * FROM cursos', // recuperar todos los cursos
  getCursoById: 'SELECT * FROM cursos WHERE id = ?', // recuperar un curso por id
  createCurso: 'INSERT INTO cursos (descripcion, precio_mensual, tipo, categoria) VALUES (?, ?, ?, ?)', // crear un curso
  deleteCurso: 'DELETE FROM cursos WHERE id = ?', // borrar un curso por id
  updateCurso: 'UPDATE cursos SET descripcion = IFNULL(?, descripcion), precio_mensual = IFNULL(?, precio_mensual), tipo = IFNULL(?, tipo), categoria = IFNULL(?, categoria) WHERE id = ?' // actualizar un curso por id, 1 o todos los campos
}

const pool = createPool(connectionConfig)

app.get(`/${API_PREFIX}/v1/`, (req, res) => {
  res.status(200)
    .json({ ok: true, status: 200, message: 'alive' })
})

app.get(`/${API_PREFIX}/v1/cursos`, async (req, res) => {
  const [rows] = await pool.query(queries.getCursos)
  try {
    rows.length <= 0
      ? res.status(404).send({ ok: false, message: 'no hay cursos disponibles' })
      : res.status(200).send({ ok: true, cursos: rows })
    console.log(rows)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
})

app.get(`/${API_PREFIX}/v1/cursos/:idCurso`, async (req, res) => {
  const { idCurso } = req.params
  const [row] = await pool.query(queries.getCursoById, [idCurso])
  try {
    row.length <= 0
      ? res.status(404).send({ ok: false, message: 'curso no encontrado' })
      : res.status(200).send({ ok: true, curso: row[0] })

    console.log(row[0])
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
})

app.post(`/${API_PREFIX}/v1/cursos`, async (req, res) => {
  const { descripcion, precio_mensual, tipo, categoria } = req.body
  const [row] = await pool.query(queries.createCurso, [descripcion, precio_mensual, tipo, categoria])
  try {
    res.status(201).send({ ok: true, id: row.insertId, curso: req.body })
    console.log(row)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
})

app.patch(`/${API_PREFIX}/v1/cursos/:idCurso`, async (req, res) => {
  const { idCurso } = req.params
  const { descripcion, precio_mensual, tipo, categoria } = req.body
  try {
    const [result] = await pool.query(queries.updateCurso, [descripcion, precio_mensual, tipo, categoria, idCurso])

    if (result.affectedRows === 0) res.status(404).send({ ok: false, message: 'curso no encontrado' })

    const [row] = await pool.query(queries.getCursoById, [idCurso])

    res.status(200).send({ ok: true, message: 'curso actualizado', curso: row[0] })
    console.log(row)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
})

app.delete(`/${API_PREFIX}/v1/cursos/:idCurso`, async (req, res) => {
  const { idCurso } = req.params
  const [result] = await pool.query(queries.deleteCurso, [idCurso])
  try {
    result.length <= 0
      ? res.status(404).send({ ok: false, message: 'curso no encontrado' })
      : res.status(204)

    const [rows] = await pool.query(queries.getCursos)
    res.status(200).send({ ok: true, message: 'curso actualizado', cursos: rows })
    console.log(rows)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
})

// rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send({ message: 'pagina no encontrada' })
})

export default app
