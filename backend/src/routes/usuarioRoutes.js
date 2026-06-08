const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/usuarioController");

router.post("/cadastroUsuario", ctrl.cadastroUsuario);

module.exports = router;
