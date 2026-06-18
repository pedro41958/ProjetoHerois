const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/heroiController");

router.post("/cadastrarHeroi", ctrl.cadastarHeroi);
router.get("/listarHerois", ctrl.listarHerois);
router.delete("/dispensarHeroi", ctrl.dispensarHeroi);

module.exports = router;
