const bcrypt = require("bcrypt");

const UsuarioModel = require("../models/UsuarioModel");

const { gerarToken } = require("../middlewares/usuarioJWT");
const schemaCadastroUsuarios = require("../schemas/usuarioSchema");

exports.cadastroUsuario = async (req, res) => {
  const resultado = schemaCadastroUsuarios.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json(resultado.error.issues);
  }

  const { nome, email, senha } = resultado.data;

  const usuarioModel = new UsuarioModel();

  const usuario = await usuarioModel.encontrarEmail(email);

  if (usuario) {
    return res.status(400).send("Email já cadastrado! Insira outro email");
  }

  try {
    const saltRoundes = 10;

    const senhaHash = await bcrypt.hash(senha, saltRoundes);

    await usuarioModel.cadastroUsuario(nome, email, senhaHash);

    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao cadastrar usuário!");
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuarioModel = new UsuarioModel();

    const usuario = await usuarioModel.encontrarEmail(email);

    if (!usuario) return res.status(401).send("Usuário não encontrado!");

    const senhaHash = await bcrypt.compare(senha, usuario.senha);

    if (senhaHash) {
      const token = gerarToken(usuario);

      res.status(201).json({ message: "Login realizado!", auth: true, token });
    } else {
      res.status(401).send("Senha incorreta!");
    }
  } catch (error) {
    res.status(500).send("Erro ao realizar login!");
  }
};
