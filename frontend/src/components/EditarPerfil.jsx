import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import api from "../api/api";
import { useUsuario } from "../context/UsuarioContext";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  email: z.string().trim().email("Email inválido!"),
  senhaAtual: z.string().min(1, "Informe sua senha atual!"),
  senhaNova: z.string().min(8, "Mínimo 8 caracteres!"),
});

function EditarPerfil({ fecharModal }) {
  const queryClient = useQueryClient();
  const { setUsuario } = useUsuario();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (usuarioEditado) => {
      return api.put("/editarPerfil", usuarioEditado);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      setUsuario(response.data.usuario);
      alert("Perfil atualizado com sucesso!");
      navigate("/perfil");
      fecharModal();
    },
    onError: (error) => {
      alert(error.response?.data);
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
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center shadow-md h-screen">
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
        <button
          onClick={fecharModal}
          className="p-2 m-5 mt-0 rounded text-white font-semibold cursor-pointer bg-gray-400"
        >
          Sair
        </button>
      </form>
    </div>
  );
}

export default EditarPerfil;
