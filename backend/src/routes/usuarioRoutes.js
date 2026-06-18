const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/usuarioController");
const middleware = require("../middlewares/usuarioJWT");

router.post("/cadastroUsuario", ctrl.cadastroUsuario);
router.post("/loginUsuario", ctrl.loginUsuario);
router.update("/editarPerfil", middleware, ctrl.editarPerfil);

module.exports = router;
