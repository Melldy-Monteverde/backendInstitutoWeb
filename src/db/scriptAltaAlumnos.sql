SHOW TABLES

CREATE DATABASE IF NOT EXISTS lmonteTest;

USE lmonteTest;

CREATE TABLE alumnos (
  id_alumno INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_persona INT(10) NOT NULL FOREIGN KEY,
  fecha_nac DATE,
  nombre_padre VARCHAR(255) DEFAULT NULL,
  nombre_madre VARCHAR(255) DEFAULT NULL,
  tutor VARCHAR(255) DEFAULT NULL,
  oSoc_prepaga VARCHAR(255) DEFAULT NULL,
  beca INT(10) DEFAULT NULL,
  usuario VARCHAR(255) NOT NULL,
  clave VARCHAR(255) NOT NULL
);

DESC alumnos;

SELECT * FROM alumnos ORDER BY id_alumno;

SELECT * FROM alumnos WHERE ID = 1;

INSERT INTO alumnos (id_alumno ,fecha_nac, nombre_padre, nombre_madre, tutor, oSoc_prepaga, beca, usuario,clave)
VALUES ( 1, '2023-08-25', 'juan ponce', 'maria ponce', 'jose fernandez', 'swiss medical', 1, 'usuario123', 'usuario123');

DELETE FROM alumnos WHERE id = 1;

UPDATE alumnos
SET fecha_nac = IFNULL(fecha_nac), nombre_padre = IFNULL(nombre_padre), nombre_madre = IFNULL(nombre_madre),
tutor = IFNULL(tutor), oSoc = IFNULL(oSoc), beca = IFNULL(beca), usuario = IFNULL(usuario), clave = IFNULL(clave)
WHERE id_alumno = 1;