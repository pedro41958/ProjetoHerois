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

  async encontrarId(idUsuario) {
    const [resultado] = await db.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [idUsuario],
    );
    return resultado[0];
  }

  async editarPerfil(idUsuario, nome, email, senha) {
    await db.query(
      `UPDATE usuarios
        SET nome = ?, email = ?, senha = ?
        WHERE id_usuario = ?`,
      [nome, email, senha, idUsuario],
    );
  }
}

module.exports = UsuarioModel;
