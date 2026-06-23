const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/dadosController");
const middleware = require("../middlewares/usuarioJWT");

router.get("/trazerDados", middleware.verificarToken, ctrl.trazerDados);

module.exports = router;
