const z = require("zod");

const schemaCadastroHerois = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  classe: z.enum(["Sprint", "Mile", "Medium", "Long"], "Classe inválida!"),
  poder: z.coerce
    .number()
    .min(0, "Mínimo poder 0!")
    .max(100, "Máximo poder 100!"),
  url_imagem: z.string().trim().min(1, "Insira a URL de uma imagem!"),
  id_guilda: z.coerce.number().min(1, "Escolha um time!"),
});

const schemaEditarHeroi = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  classe: z.enum(["Sprint", "Mile", "Medium", "Long"], "Classe inválida!"),
  poder: z.coerce
    .number()
    .min(0, "Mínimo poder 0!")
    .max(100, "Máximo poder 100!"),
});

module.exports = { schemaCadastroHerois, schemaEditarHeroi };
