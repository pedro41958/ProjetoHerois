const { success } = require("zod");
const db = require("../config/db");
const {
  schemaCadastroHerois,
  schemaEditarHeroi,
} = require("../schemas/heroiSchema");
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

exports.buscarHeroi = async (req, res) => {
  const { id } = req.params;

  try {
    const heroiModel = new HeroiModel();

    const heroi = await heroiModel.buscarHeroi(id);

    if (!heroi) {
      return res.status(404).json({ mensagem: "Herói não encontrado" });
    }

    res.json(heroi);
  } catch (error) {
    res.status(500).send("Erro ao trazer herói!");
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

  exports.editarPerfil = async (req, res) => {
    const resultado = schemaEditarHeroi.safeParse(req.body);
    const { id } = req.params;

    if (!resultado.success) {
      return res.status(400).json(resultado.error.issues);
    }

    const { nome, classe, poder } = resultado.data;

    try {
      const heroiModel = new HeroiModel();

      const heroi = await heroiModel.editarHeroi(id, nome, classe, poder);

      res.status(200).json({
        message: "Perfil atualizado!",
        auth: true,
        heroi,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
};
