const jwt = require("jsonwebtoken");
require("dotenv").config();

function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, nome: usuario.nome, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
}

module.exports = gerarToken;
