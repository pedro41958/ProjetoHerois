import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";

const schema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  email: z.string().trim().email("Email inválido!"),
  senha: z.string().min(8, "Mínimo 8 caracteres!"),
});

function CadastroUsuario() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (novoUsuario) => {
      return axios.post("http://localhost:3000/cadastroUsuario", novoUsuario);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [erros, setErros] = useState({});

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    const resultado = schema.safeParse(formData);

    if (!resultado.success) {
      setErros(resultado.error.format());
    } else {
      setErros({});

      mutate(resultado.data);

      alert("Usuário cadastrado com sucesso!");
    }
  }

  return (
    <div className="flex items-center justify-center bg-slate-100 p-5 shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded-xl shadow-md w-80 border-4 border-gray-400"
      >
        <h2 className="text-x1 text-center font-bold mb-4">Cadastro</h2>

        <label htmlFor="nome" className="text-center">
          Nome completo:
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
            required
          />
          {erros.nome && <p className="text-red-500">{erros.nome._errors}</p>}
        </label>

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
          {erros.nome && <p className="text-red-500">{erros.nome._errors}</p>}
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
          {erros.nome && <p className="text-red-500">{erros.nome._errors}</p>}
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

export default CadastroUsuario;
