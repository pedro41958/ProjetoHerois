const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/missaoController");
const middleware = require("../middlewares/usuarioJWT");

router.post("/criarMissao", middleware.verificarToken, ctrl.criarMissao);
router.get(
  "/herois/:id/missoes",
  middleware.verificarToken,
  ctrl.listarMissoes,
);

module.exports = router;
