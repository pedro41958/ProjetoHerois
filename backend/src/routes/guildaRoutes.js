const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/guildaController");
const middleware = require("../middlewares/usuarioJWT");

router.get("/buscarGuildas", middleware.verificarToken, ctrl.buscarGuildas);
router.post("/criarGuilda", middleware.verificarToken, ctrl.criarGuilda);

module.exports = router;
