/* eslint-disable camelcase */
import { createPool } from 'mysql2/promise'
import { connectionConfig } from '../config/dbConfig.js'
import { queriesAltaAlumnos } from '../db/dbQueries.js'

const pool = createPool(connectionConfig)

export const getAllAlumnos = async (req, res) => {
  const [rows] = await pool.query(queriesAltaAlumnos.getAllAlumnos)
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

export const getAlumnoById = async (req, res) => {
  const { idAlumno } = req.params
  const [rows] = await pool.query(queriesAltaAlumnos.getAlumnoById, [idAlumno])
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

export const createAlumno = async (req, res) => {
  const { id_persona, fecha_nac, nombre_padre, nombre_madre, tutor, oSoc_prepaga, beca, usuario, clave } = req.body
  const [row] = await pool.query(queriesAltaAlumnos.createAlumno, [id_persona, fecha_nac, nombre_padre, nombre_madre, tutor, oSoc_prepaga, beca, usuario, clave])
  try {
    res.status(201).send({ ok: true, id: row.insertId, resultado: req.body })
    console.log(row)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}

export const updateAlumnoById = async (req, res) => {
  const { idAlumno } = req.params
  const { fecha_nac, nombre_padre, nombre_madre, tutor, oSoc_prepaga, beca, usuario, clave } = req.body
  const [result] = await pool.query(queriesAltaAlumnos.updateAlumnoById, [fecha_nac, nombre_padre, nombre_madre, tutor, oSoc_prepaga, beca, usuario, clave, idAlumno])
  try {
    if (result.affectedRows === 0 || idAlumno === undefined) return res.status(404).send({ ok: false, message: 'alumno no encontrado' })

    const [row] = await pool.query(queriesAltaAlumnos.getAlumnoById, [idAlumno])

    res.status(200).send({ ok: true, message: 'datos actualizados', resultado: row[0] })
    console.log(row)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}

export const deleteAlumnoById = async (req, res) => {
  const { idAlumno } = req.params
  const [result] = await pool.query(queriesAltaAlumnos.deleteAlumnoById, [idAlumno])
  try {
    if (result.affectedRows === 0) return res.status(404).send({ ok: false, message: 'alumno no encontrado' })

    // result.length <= 0
    //   ? res.status(404).send({ ok: false, message: 'alumno no encontrado' })
    //   : res.status(204)

    const [rows] = await pool.query(queriesAltaAlumnos.getAllAlumnos)
    res.status(200).send({ ok: true, message: 'datos eliminados', resultado: rows })
    console.log(rows)
    console.log(result)
  } catch (error) {
    console.log('__ERROR__:', error)
    return res.status(500).send({ message: 'algo salio mal' })
  }
}
