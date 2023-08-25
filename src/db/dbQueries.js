// LA BASE PROD ES: cursos
// LA BASE VACIA ES: testing2

export const queriesCursos = {
  getCursos: 'SELECT * FROM cursos ORDER BY id;',

  getCursoById: 'SELECT * FROM cursos WHERE id = ?;',

  createCurso: 'INSERT INTO cursos (descripcion, precio_mensual, tipo, categoria) VALUES (?, ?, ?, ?);',

  deleteCurso: 'DELETE FROM testing2 WHERE id = ?;',

  updateCurso: 'UPDATE cursos SET descripcion = IFNULL(?, descripcion), precio_mensual = IFNULL(?, precio_mensual), tipo = IFNULL(?, tipo), categoria = IFNULL(?, categoria) WHERE id = ?;'
}

export const queriesResultadosExamenes = {
  getResultadoExamenes: 'SELECT re.*, c.descripcion AS descripcion_curso FROM resultado_examenes re INNER JOIN cursos c ON re.curso_id = c.id ORDER BY re.id;',

  getResultadoExamenById: 'SELECT re.*, c.descripcion as descripcion_curso FROM resultado_examenes re INNER JOIN cursos c ON re.curso_id = c.id WHERE re.alumno_id = ? AND re.curso_id = c.id;',

  createResultadoExamen: 'INSERT INTO resultado_examenes (fecha, curso_id, alumno_id, alumno_nombre, docente_id, calificacion) VALUES (?, ?, ?, ?, ?, ?);',

  deleteResultadoExamen: 'DELETE FROM resultado_examenes WHERE id = ?;',

  updateResultadoExamen: 'UPDATE resultado_examenes SET calificacion = IFNULL(?, calificacion) WHERE id = ?'
}
