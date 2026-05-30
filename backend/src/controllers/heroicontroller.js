const db = require("../config/db");

exports.cadastarHeroi = async (req, res) => {
  const { nome, classe, poder, status } = req.body;

  try {
    const cadastarHeroi = await db.query(
      "INSERT INTO herois(nome, classe, poder, status) VALUES(?, ?, ?, ?)",
      [nome, classe, poder, status],
    );

    res.status(201).send("Herói cadastrado!");
  } catch (error) {
    res.status(500).send("Erro ao cadastrar!");
  }
};
