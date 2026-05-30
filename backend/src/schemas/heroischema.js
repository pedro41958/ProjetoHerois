const z = require("zod");

const schema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  classe: z.enum(["Mile", "Medium", "Long"], "Classe inválida!"),
  poder: z.number().min(0, "Mínimo poder 0!").max(100, "Máximo poder 100!"),
  status: z.enum(["online", "ausente", "offline"], "Status inválido!"),
});

module.exports = schema;
