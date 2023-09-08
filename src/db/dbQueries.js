export const queriesCursos = {
  getCursos: 'SELECT * FROM cursos ORDER BY id;',

  getCursoById: 'SELECT * FROM cursos WHERE id = ?;',

  createCurso: 'INSERT INTO cursos (descripcion, precio_mensual, tipo, categoria) VALUES (?, ?, ?, ?);',

  deleteCurso: 'DELETE FROM cursos WHERE id = ?;',

  updateCurso: 'UPDATE cursos SET descripcion = IFNULL(?, descripcion), precio_mensual = IFNULL(?, precio_mensual), tipo = IFNULL(?, tipo), categoria = IFNULL(?, categoria) WHERE id = ?;'
}

export const queriesResultadosExamenes = {
  getResultadoExamenes: 'SELECT re.*, c.descripcion AS descripcion_curso FROM resultado_examenes re INNER JOIN cursos c ON re.curso_id = c.id ORDER BY re.id;',

  getResultadoExamenById: 'SELECT re.*, c.descripcion as descripcion_curso FROM resultado_examenes re INNER JOIN cursos c ON re.curso_id = c.id WHERE re.alumno_id = ? AND re.curso_id = c.id;',

  createResultadoExamen: 'INSERT INTO resultado_examenes (fecha, curso_id, alumno_id, alumno_nombre, docente_id, calificacion) VALUES (?, ?, ?, ?, ?, ?);',

  deleteResultadoExamen: 'DELETE FROM resultado_examenes WHERE id = ?;',

  updateResultadoExamen: 'UPDATE resultado_examenes SET calificacion = IFNULL(?, calificacion) WHERE id = ?'
}

export const queriesAltaAlumnos = {
  getAllAlumnos: 'SELECT * FROM alumnos ORDER BY id_alumno;',

  getAlumnoById: 'SELECT * FROM alumnos WHERE id_alumno = ?;',

  createAlumno: 'INSERT INTO alumnos (fecha_nac, nombre_padre, nombre_madre, tutor, oSoc_prepaga, beca, usuario, clave)  VALUES (?, ?, ?, ?, ?, ?, ?, ?);',

  updateAlumnoById: 'UPDATE alumnos SET fecha_nac = IFNULL(?, fecha_nac), nombre_padre = IFNULL(?, nombre_padre), nombre_madre = IFNULL(?, nombre_madre), tutor = IFNULL(?, tutor), oSoc_prepaga = IFNULL(?, oSoc_prepaga), beca = IFNULL(?, beca), usuario = IFNULL(?, usuario), clave = IFNULL(?, clave) WHERE id_alumno = ?;',

  deleteAlumnoById: 'DELETE FROM alumnos WHERE id_alumno = ?;'
}
