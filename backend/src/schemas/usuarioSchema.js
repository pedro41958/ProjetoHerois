const z = require("zod");

const schemaCadastroUsuarios = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  email: z.string().trim().email("Email inválido!"),
  senha: z.string().min(8, "Mínimo 8 caracteres!"),
});

module.exports = schemaCadastroUsuarios;
