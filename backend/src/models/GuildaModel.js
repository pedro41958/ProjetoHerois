const db = require("../config/db");

class GuildaModel {
  async buscarGuildas() {
    const [resultado] = await db.query("SELECT * FROM guildas");

    return resultado;
  }
}

module.exports = GuildaModel;
