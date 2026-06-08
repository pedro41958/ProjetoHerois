const express = require("express");
const cors = require("cors");
const heroiRouter = require("./routes/heroiRoutes");
const usuarioRouter = require("./routes/usuarioRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(heroiRouter);
app.use(usuarioRouter);

app.listen(3000, () => {
  console.log("Servidor Porta 3000");
});
