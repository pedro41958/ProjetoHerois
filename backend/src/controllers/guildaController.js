const GuildaModel = require("../models/GuildaModel");

exports.buscarGuildas = async (req, res) => {
  try {
    const guildaModel = new GuildaModel();

    const guildas = await guildaModel.buscarGuildas();

    res.json(guildas);
  } catch (error) {
    res.status(500).send("Erro ao trazer guildas!");
  }
};
