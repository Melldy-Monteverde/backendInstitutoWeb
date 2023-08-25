SHOW TABLES

CREATE DATABASE IF NOT EXISTS lmonteTest;

USE lmonteTest;

CREATE TABLE cursos (
  id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(255) DEFAULT NULL,
  precio_mensual DECIMAL(10, 2) DEFAULT NULL,
  tipo VARCHAR(255) DEFAULT NULL,
  categoria VARCHAR(255) DEFAULT NULL
);

DESC cursos;

SELECT * FROM cursos;

SELECT * FROM cursos WHERE ID = 1;

INSERT INTO cursos (descripcion, precio_mensual, tipo, categoria) VALUES ('descripcion', 100, 'tipo', 'categoria' )
DELETE FROM cursos WHERE id = 1;

UPDATE cursos 
SET descripcion = IFNULL(descripcion), precio_mensual = IFNULL(precio), tipo = IFNULL(tipo), categoria = IFNULL(categoria) 
WHERE id = 1;