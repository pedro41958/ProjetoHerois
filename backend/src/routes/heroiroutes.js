const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/heroicontroller");

router.post("/cadastrarHeroi", ctrl.cadastarHeroi);
router.get("/listarHerois", ctrl.listarHerois);

module.exports = router;
