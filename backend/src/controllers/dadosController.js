const db = require("../config/db");
const DadosModel = require("../models/DadosModel");

exports.trazerDados = async (req, res) => {
  const idUsuario = req.usuario.id;

  try {
    const dadosModel = new DadosModel();

    const dados = await dadosModel.trazerDados(idUsuario);

    res.json(dados[0]);
  } catch (error) {
    res.status(500).send("Erro ao trazer dados!");
  }
};
