CREATE DATABASE IF NOT EXISTS lmonteTest;

USE lmonteTest;

CREATE TABLE cursos (
  id INT(10) NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(255) DEFAULT NULL,
  precio_mensual DECIMAL(10, 2) DEFAULT NULL,
  tipo VARCHAR(255) DEFAULT NULL,
  categoria VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

DESC cursos;

SELECT * FROM cursos;
SELECT * FROM cursos WHERE ID = 1;
INSERT INTO cursos (descripcion, precio_mensual, tipo, categoria) VALUES ()
DELETE FROM cursos WHERE id = 1;
UPDATE cursos 
SET nombre = IFNULL(nombre), descripcion = IFNULL(descripcion), precio = IFNULL(precio)
WHERE id = 1;