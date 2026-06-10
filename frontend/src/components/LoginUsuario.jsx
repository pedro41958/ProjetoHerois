import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  classe: z.enum(["Mile", "Medium", "Long"], "Classe inválida!"),
  poder: z.coerce
    .number()
    .min(0, "Mínimo poder 0!")
    .max(100, "Máximo poder 100!"),
  status: z.enum(["online", "ausente", "offline"], "Status inválido!"),
});

function LoginUsuario() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (novoHeroi) => {
      return axios.post("http://localhost:3000/cadastrarHeroi", novoHeroi);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["herois"] });
    },
  });

  const [formData, setFormData] = useState({
    nome: "",
    classe: "",
    poder: "",
    status: "",
  });

  const [erros, setErros] = useState({});

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const resultado = schema.safeParse(formData);

    if (!resultado.success) {
      setErros(resultado.error.format());
    } else {
      setErros({});

      mutate(resultado.data);

      console.log("Um novo herói foi validado e salvo!");
      alert("Formulário enviado com sucesso!");
    }
  }
  return (
    <div className="flex items-center justify-center bg-slate-100 p-5 shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded-xl shadow-md w-80 border-4 border-gray-400"
      >
        <input type="hidden" name="id" />

        <h2 className="text-x1 text-center font-bold mb-4">Login</h2>

        <label htmlFor="email" className="text-center">
          E-mail:
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
            required
          />
          {erros.email && <p className="text-red-500">{erros.email._errors}</p>}
        </label>

        <label htmlFor="senha" className="text-center">
          Senha:
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
            required
          />
          {erros.senha && <p className="text-red-500">{erros.senha._errors}</p>}
        </label>

        <button
          disabled={isPending}
          className={`p-2 rounded text-white font-semibold ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#9870AA] cursor-pointer"
          }`}
        >
          {isPending ? "Salvando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default LoginUsuario;
