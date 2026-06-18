import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import api from "../api/api";

const schema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  email: z.string().trim().email("Email inválido!"),
  senhaNova: z.string().min(8, "Mínimo 8 caracteres!"),
});

function EditarPerfil() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (usuarioEditado) => {
      return api.update("/editarPerfil", usuarioEditado);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      alert("Perfil atualizado com sucesso!");
    },
  });

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senhaAtual: "",
    senhaNova: "",
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
    }
  }

  return (
    <div className="flex flex-col items-center bg-slate-100 shadow-md h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded-xl shadow-md w-80 border-4 border-gray-400"
      >
        <h2 className="text-x1 text-center font-bold mb-4">Editar Perfil</h2>

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
          {erros.email && <p className="text-red-500">{erros.email._errors}</p>}
        </label>

        <label htmlFor="senha" className="text-center">
          Senha ATUAL:
          <input
            type="password"
            name="senhaAtual"
            placeholder="Senha atual"
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
            required
          />
        </label>

        <label htmlFor="senha" className="text-center">
          Senha NOVA:
          <input
            type="password"
            name="senhaNova"
            placeholder="Senha nova"
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
            required
          />
          {erros.senhaNova && (
            <p className="text-red-500">{erros.senhaNova._errors}</p>
          )}
        </label>

        <button
          disabled={isPending}
          className={`p-2 m-5 rounded text-white font-semibold ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#9870AA] cursor-pointer"
          }`}
        >
          {isPending ? "Salvando..." : "Atualizar"}
        </button>
      </form>
    </div>
  );
}

export default EditarPerfil;
