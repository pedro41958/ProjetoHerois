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
      `SELECT herois.*, guildas.nome AS nome_guilda
      FROM herois
      LEFT JOIN guildas
        ON herois.id_guilda = guildas.id_guilda
      WHERE herois.id_usuario = ?`,
      [idUsuario],
    );

    return resultado;
  }

  async buscarHeroi(id) {
    const [resultado] = await db.query(
      `SELECT herois.*, guildas.nome AS nome_guilda
      FROM herois
      LEFT JOIN guildas
        ON herois.id_guilda = guildas.id_guilda
      WHERE herois.id_usuario = ?`,
      [id],
    );

    return resultado[0];
  }

  async excluirHeroi(id) {
    await db.query("DELETE FROM missoes WHERE id_heroi = ?", [id]);

    const [resultado] = await db.query(
      "DELETE FROM herois WHERE id_heroi = ?",
      [id],
    );
    return resultado;
  }

  async editarHeroi(id, nome, classe, poder) {
    await db.query(
      `UPDATE herois
          SET nome = ?, classe = ?, poder = ?
          WHERE id_heroi = ?`,
      [nome, classe, poder, id],
    );
  }
}

module.exports = HeroiModel;
