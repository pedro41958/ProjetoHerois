import z from "zod";

const schema = z.object({
  nome: z.string().min(3, "Nome muito curto!"),
  classe: z.enum(["Início", "Meio", "Final"]).nonempty(),
  poder: z.number().min(0, "Poder muito baixo!").max(100, "Poder muito alto!"),
});
