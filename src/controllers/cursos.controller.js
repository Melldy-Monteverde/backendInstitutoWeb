/* eslint-disable camelcase */
import { createPool } from 'mysql2/promise'
import { connectionConfig } from '../config/dbConfig.js'
import { queriesCursos } from '../db/dbQueries.js'

const pool = createPool(connectionConfig)

export const getAllCursos = async (req, res) => {
  const [rows] = await pool.query(queriesCursos.getCursos)
  try {
    rows.length <= 0
      ? res.status(404).send({ ok: false, message: 'no hay cursos disponibles' })
      : res.status(200).send({ ok: true, cursos: rows })
    console.log(rows)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}

export const getCursoById = async (req, res) => {
  const { idCurso } = req.params
  const [row] = await pool.query(queriesCursos.getCursoById, [idCurso])
  try {
    row.length <= 0
      ? res.status(404).send({ ok: false, message: 'curso no encontrado' })
      : res.status(200).send({ ok: true, curso: row[0] })

    console.log(row[0])
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}

export const createCurso = async (req, res) => {
  const { descripcion, precio_mensual, tipo, categoria } = req.body
  const [row] = await pool.query(queriesCursos.createCurso, [descripcion, precio_mensual, tipo, categoria])
  try {
    res.status(201).send({ ok: true, id: row.insertId, curso: req.body })
    console.log(row)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}

export const updateCursoById = async (req, res) => {
  const { idCurso } = req.params
  const { descripcion, precio_mensual, tipo, categoria } = req.body
  try {
    const [result] = await pool.query(queriesCursos.updateCurso, [descripcion, precio_mensual, tipo, categoria, idCurso])

    if (result.affectedRows === 0) return res.status(404).send({ ok: false, message: 'curso no encontrado' })

    const [row] = await pool.query(queriesCursos.getCursoById, [idCurso])

    res.status(200).send({ ok: true, message: 'curso actualizado', curso: row[0] })
    console.log(row)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}

export const deleteCursoById = async (req, res) => {
  const { idCurso } = req.params
  const [result] = await pool.query(queriesCursos.deleteCurso, [idCurso])
  try {
    // if (result.affectedRows === 0 || idCurso === undefined) return res.status(404).send({ ok: false, message: 'curso no encontrado' })

    result.length <= 0
      ? res.status(404).send({ ok: false, message: 'no hay cursos' })
      : res.status(204)

    const [rows] = await pool.query(queriesCursos.getCursos)
    res.status(200).send({ ok: true, message: 'curso eliminado', cursos: rows })
    console.log(rows)
    console.log(result)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}
