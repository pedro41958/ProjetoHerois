const z = require("zod");

const schemaCadastroUsuarios = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  email: z.string().trim().email("Email inválido!"),
  senha: z.string().min(8, "Mínimo 8 caracteres!"),
});

const schemaEditarPerfil = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  email: z.string().trim().email("Email inválido!"),
  senhaAtual: z.string().min(1, "Informe sua senha atual!"),
  senhaNova: z.string().min(8, "Mínimo 8 caracteres!"),
});

module.exports = {
  schemaCadastroUsuarios,
  schemaEditarPerfil,
};
