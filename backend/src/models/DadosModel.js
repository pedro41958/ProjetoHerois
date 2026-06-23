const db = require("../config/db");

class DadosModel {
  async trazerDados(idUsuario) {
    const [resultado] = await db.query(
      `
        SELECT
    (SELECT COUNT(*)
     FROM herois
     WHERE id_usuario = ?) AS total_herois,

    (SELECT ROUND(AVG(poder), 2)
     FROM herois
     WHERE id_usuario = ?) AS media_poder,

    (
      SELECT g.nome
      FROM guildas g
      INNER JOIN herois h
          ON h.id_guilda = g.id_guilda
      WHERE g.id_usuario = ?
      GROUP BY g.id_guilda, g.nome
      ORDER BY SUM(h.poder) DESC
      LIMIT 1
    ) AS guilda_mais_forte`,
      [idUsuario, idUsuario, idUsuario],
    );

    return resultado;
  }
}

module.exports = DadosModel;
