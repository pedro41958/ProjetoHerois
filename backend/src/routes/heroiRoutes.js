const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/heroiController");
const middleware = require("../middlewares/usuarioJWT");

router.post("/cadastrarHeroi", middleware.verificarToken, ctrl.cadastrarHeroi);
router.get("/listarHerois", middleware.verificarToken, ctrl.listarHerois);
router.delete(
  "/dispensarHeroi",
  middleware.verificarToken,
  ctrl.dispensarHeroi,
);

module.exports = router;
