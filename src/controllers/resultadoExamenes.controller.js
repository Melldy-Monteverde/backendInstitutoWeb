/* eslint-disable camelcase */
import { createPool } from 'mysql2/promise'
import { connectionConfig } from '../config/dbConfig.js'
import { queriesResultadosExamenes } from '../db/dbQueries.js'

const pool = createPool(connectionConfig)

export const getAllResultados = async (req, res) => {
  const [rows] = await pool.query(queriesResultadosExamenes.getResultadoExamenes)
  try {
    rows.length <= 0
      ? res.status(404).send({ ok: false, message: 'no hay resultados disponibles' })
      : res.status(200).send({ ok: true, resultados: rows })
    console.log(rows)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}

export const getResultadoByAlumnoId = async (req, res) => {
  const { idAlumno } = req.params
  const [rows] = await pool.query(queriesResultadosExamenes.getResultadoExamenById, [idAlumno])
  try {
    rows.length <= 0
      ? res.status(404).send({ ok: false, message: 'alumno no encontrado' })
      : res.status(200).send({ ok: true, resultado: rows })

    console.log(rows)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}

export const createResultado = async (req, res) => {
  const { fecha, curso_id, alumno_id, alumno_nombre, docente_id, calificacion } = req.body
  const [row] = await pool.query(queriesResultadosExamenes.createResultadoExamen, [fecha, curso_id, alumno_id, alumno_nombre, docente_id, calificacion])
  try {
    res.status(201).send({ ok: true, id: row.insertId, resultado: req.body })
    console.log(row)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}

export const updateResultadoByExamenId = async (req, res) => {
  const { idExamen } = req.params
  const { calificacion } = req.body
  const [result] = await pool.query(queriesResultadosExamenes.updateResultadoExamen, [calificacion, idExamen])
  try {
    if (result.affectedRows === 0 || idExamen === undefined) return res.status(404).send({ ok: false, message: 'examen no encontrado' })

    const [row] = await pool.query(queriesResultadosExamenes.getResultadoExamenById, [idExamen])

    res.status(200).send({ ok: true, message: 'datos actualizados', resultado: row[0] })
    console.log(row)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}

export const deleteResultadoByExamenId = async (req, res) => {
  const { idExamen } = req.params
  const [result] = await pool.query(queriesResultadosExamenes.deleteResultadoExamen, [idExamen])
  try {
    if (result.affectedRows === 0 || idExamen === undefined) return res.status(404).send({ ok: false, message: 'examen no encontrado' })

    // result.length <= 0
    //   ? res.status(404).send({ ok: false, message: 'no hay examenes no encontrado' })
    //   : res.status(204)

    const [rows] = await pool.query(queriesResultadosExamenes.getResultadoExamenes)
    res.status(200).send({ ok: true, message: 'datos eliminados', resultado: rows })
    console.log(rows)
    console.log(result)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}
