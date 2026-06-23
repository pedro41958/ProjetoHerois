const { success } = require("zod");
const db = require("../config/db");

const schemaCriarMissao = require("../schemas/missaoSchema");
const MissaoModel = require("../models/HeroiModel");

exports.criarMissao = async (req, res) => {
  const resultado = schemaCriarMissao.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json(resultado.error.issues);
  }

  const { descricao, status, recompensa_ouro, id_heroi } = resultado.data;

  const missaoModel = new MissaoModel();

  try {
    await missaoModel.criarMissao(descricao, status, recompensa_ouro, id_heroi);

    res.status(201).send("Missão criada!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.listarMissoes = async (req, res) => {
  const idHeroi = req.params;

  try {
    const missaoModel = new MissaoModel();

    const missoes = await missaoModel.listarMissoes(idHeroi);

    res.json(missoes);
  } catch (error) {
    res.status(500).send("Erro ao trazer missões!");
  }
};
