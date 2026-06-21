const db = require("../config/db");

class HeroiModel {
  async cadastarHeroi(nome, classe, poder, urlImagem, idUsuario, idGuilda) {
    await db.query(
      "INSERT INTO herois(nome, classe, poder, url_imagem, id_usuario, id_guilda) VALUES(?, ?, ?, ?, ?, ?)",
      [nome, classe, poder, urlImagem, idUsuario, idGuilda],
    );
  }

  async listarHerois(idUsuario) {
    const [resultado] = await db.query(
      "SELECT * FROM herois WHERE id_usuario = ?",
      [idUsuario],
    );

    return resultado;
  }
}

module.exports = HeroiModel;
