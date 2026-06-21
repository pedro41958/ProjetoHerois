const db = require("../config/db");

class GuildaModel {
  async criarGuilda(nome, idUsuario) {
    await db.query("INSERT INTO guildas(nome, id_usuario) VALUES(?, ?)", [
      nome,
      idUsuario,
    ]);
  }

  async buscarGuildas(idUsuario) {
    const [resultado] = await db.query(
      "SELECT * FROM guildas WHERE id_usuario = ?",
      [idUsuario],
    );

    return resultado;
  }
}

module.exports = GuildaModel;
