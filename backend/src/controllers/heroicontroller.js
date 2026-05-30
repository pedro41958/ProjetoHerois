const { success } = require("zod");
const db = require("../config/db");
const schema = require("../schemas/heroischema");

exports.cadastarHeroi = async (req, res) => {
  const resultado = schema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json(resultado.error.issues);
  }

  const { nome, classe, poder, status } = resultado.data;

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
