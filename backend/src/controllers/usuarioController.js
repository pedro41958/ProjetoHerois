const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsuarioModel = require("../models/UsuarioModel");

const schemaCadastroUsuarios = require("../schemas/usuarioSchema");

exports.cadastroUsuario = async (req, res) => {
  const resultado = schemaCadastroUsuarios.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json(resultado.error.issues);
  }

  const { nome, email, senha } = resultado.data;

  const usuario = new UsuarioModel();

  usuario.encontrarEmail(email);

  if (usuario > 0) {
    return res.status(400).send("Email já cadastrado! Insira outro email");
  }

  try {
    const saltRoundes = 10;

    const senhaHash = await bcrypt.hash(senha, saltRoundes);

    usuario.cadastroUsuario(nome, email, senhaHash);

    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao cadastrar usuário!");
  }
};
