CREATE DATABASE portal_herois;

USE portal_herois;

CREATE TABLE usuarios (
  id_usuario int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  senha varchar(100) NOT NULL
);

CREATE TABLE guildas (
  id_guilda INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,

  id_usuario INT NOT NULL,

  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE herois (
  id_heroi INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  classe ENUM('Sprint', 'Mile', 'Medium', 'Long') NOT NULL,
  poder INT NOT NULL,
  url_imagem TEXT,

  id_usuario INT NOT NULL,
  id_guilda INT NOT NULL,

  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_guilda) REFERENCES guildas(id_guilda)
);

CREATE TABLE missoes (
  id_missao INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  status ENUM('Em andamento', 'Concluida', 'Falhou') NOT NULL,
  recompensa_ouro INT NOT NULL,

  id_heroi INT NOT NULL,

  FOREIGN KEY (id_heroi) REFERENCES herois(id_heroi)
);