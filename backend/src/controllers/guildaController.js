const db = require("../config/db");
const GuildaModel = require("../models/GuildaModel");
const schemaCriarGuilda = require("../schemas/guildaSchema");

exports.criarGuilda = async (req, res) => {
  const resultado = schemaCriarGuilda.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json(resultado.error.issues);
  }

  const idUsuario = req.usuario.id;

  const { nome } = resultado.data;

  const guildaModel = new GuildaModel();

  try {
    await guildaModel.criarGuilda(nome, idUsuario);

    res.status(201).send("Guilda criada!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.buscarGuildas = async (req, res) => {
  const idUsuario = req.usuario.id;

  try {
    const guildaModel = new GuildaModel();

    const guildas = await guildaModel.buscarGuildas(idUsuario);

    res.json(guildas);
  } catch (error) {
    res.status(500).send("Erro ao trazer guildas!");
  }
};
