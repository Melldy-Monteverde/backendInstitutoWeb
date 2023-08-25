SHOW TABLES

CREATE DATABASE IF NOT EXISTS lmonteTest;

USE lmonteTest;

CREATE TABLE resultado_examenes (
    id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    curso_id INT(10) NOT NULL,
    alumno_id INT(10) NOT NULL,
    alumno_nombre VARCHAR(255) DEFAULT NULL,
    docente_id INT(10) NOT NULL,
    calificacion DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

DESC resultado_examenes;

SELECT re.*, c.descripcion AS descripcion_curso
FROM resultado_examenes re
INNER JOIN cursos c ON re.curso_id = c.id
ORDER BY re.id;

SELECT re.*, c.descripcion AS descripcion_curso
FROM resultado_examenes re
INNER JOIN cursos c ON re.curso_id = c.id
WHERE re.alumno_id = 1
AND re.curso_id = c.id;

SELECT re.*, c.descripcion AS descripcion_curso
FROM resultado_examenes re
INNER JOIN cursos c ON re.curso_id = c.id
ORDER BY re.alumno_nombre ASC;

INSERT INTO resultado_examenes (fecha, curso_id, alumno_id, alumno_nombre, docente_id, calificacion)
VALUES ('2023-08-25', 4, 2, 'melldy monteverde', 3, 5)

DELETE FROM resultado_examenes WHERE id = 1;

UPDATE resultado_examenes
SET 
    calificacion = IFNULL(?, calificacion)
WHERE id = 1;

DROP TABLE resultado_examenes;