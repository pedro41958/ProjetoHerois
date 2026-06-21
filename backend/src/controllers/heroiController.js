const { success } = require("zod");
const db = require("../config/db");
const schemaCadastroHerois = require("../schemas/heroiSchema");
const HeroiModel = require("../models/HeroiModel");

exports.cadastrarHeroi = async (req, res) => {
  const resultado = schemaCadastroHerois.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json(resultado.error.issues);
  }

  const idUsuario = req.usuario.id;

  const { nome, classe, poder, url_imagem, id_guilda } = resultado.data;

  const heroiModel = new HeroiModel();

  try {
    await heroiModel.cadastarHeroi(
      nome,
      classe,
      poder,
      url_imagem,
      idUsuario,
      id_guilda,
    );

    res.status(201).send("Herói cadastrado!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.listarHerois = async (req, res) => {
  const idUsuario = req.usuario.id;

  try {
    const heroiModel = new HeroiModel();

    const herois = await heroiModel.listarHerois(idUsuario);

    res.json(herois);
  } catch (error) {
    res.status(500).send("Erro ao trazer heróis!");
  }
};

exports.dispensarHeroi = async (req, res) => {
  const { id } = req.body;

  try {
    const heroiModel = new HeroiModel();

    const heroi = await heroiModel.excluirHeroi(id);

    res.status(201).send("Herói dispensado...");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao dispensar...");
  }
};
