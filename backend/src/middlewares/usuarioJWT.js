const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.gerarToken = (req, res, next) => {
  jwt.sign(
    { id: req.id, nome: req.nome, email: req.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  res.status(201).json({ message: "Token gerado!" });
  next();
};

exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido." });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (err) {
    return res.status(403).json({ erro: "Token inválido." });
  }
};
