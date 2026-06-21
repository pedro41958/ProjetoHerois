const z = require("zod");

const schemaCriarGuilda = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
});

module.exports = schemaCriarGuilda;
