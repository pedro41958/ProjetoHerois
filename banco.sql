CREATE DATABASE portal_herois;

USE portal_herois;

CREATE TABLE usuarios (
  id_usuario int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  senha varchar(100) NOT NULL
);
