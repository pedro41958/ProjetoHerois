const z = require("zod");

const schemaCriarMissao = z.object({
  descricao: z.string().min(3, "Mínimo 3 caracteres!"),
  status: z.enum(["Em treinamento", "Vitória", "Derrota"], "Status inválido!"),
  recompensa_ouro: z.coerce.number().min(0, "Mínimo poder 0!"),
  id_heroi: z.coerce.number().min(1, "Escolha uma Umamusume!"),
});

module.exports = schemaCriarMissao;
