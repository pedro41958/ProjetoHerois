const express = require("express");
const cors = require("cors");
const heroiRouter = require("./routes/heroiRoutes");
const usuarioRouter = require("./routes/usuarioRoutes");
const guildaRouter = require("./routes/guildaRoutes");
const missaoRouter = require("./routes/missaoRoutes");
const dadosRouter = require("./routes/dadosRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(heroiRouter);
app.use(usuarioRouter);
app.use(guildaRouter);
app.use(missaoRouter);
app.use(dadosRouter);

app.listen(3000, () => {
  console.log("Servidor Porta 3000");
});
