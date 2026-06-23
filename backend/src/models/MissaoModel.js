const db = require("../config/db");

class MissaoModel {
  async criarMissao(descricao, status, recompensa_ouro, idHeroi) {
    await db.query(
      "INSERT INTO missoes(descricao, status, recompensa_ouro, id_heroi) VALUES(?, ?, ?, ?)",
      [descricao, status, recompensa_ouro, idHeroi],
    );
  }

  async listarMissoes(idHeroi) {
    const [resultado] = await db.query(
      "SELECT * FROM missoes WHERE id_heroi = ?",
      [idHeroi],
    );

    return resultado;
  }
}

module.exports = MissaoModel;
