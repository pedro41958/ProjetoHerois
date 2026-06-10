const db = require("../config/db");

class UsuarioModel {
  async cadastroUsuario(nome, email, senha) {
    await db.query("INSERT INTO usuarios(nome, email, senha) VALUES(?, ?, ?)", [
      nome,
      email,
      senha,
    ]);
  }

  async encontrarEmail(email) {
    const [resultado] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
    );
    return resultado[0];
  }
}

module.exports = UsuarioModel;
