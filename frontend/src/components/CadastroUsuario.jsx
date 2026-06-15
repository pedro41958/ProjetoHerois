import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  email: z.string().trim().email("Email inválido!"),
  senha: z.string().min(8, "Mínimo 8 caracteres!"),
});

function CadastroUsuario() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (novoUsuario) => {
      return api.post("/cadastroUsuario", novoUsuario);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      alert("Usuário cadastrado com sucesso!");
      navigate("/loginUsuario");
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
      <h1 className="bg-slate-500 text-white w-full text-center p-2 mb-6 font-semibold ">
        Cadastre-se como um treinador!
      </h1>
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
          className={`p-2 m-5 rounded text-white font-semibold ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#9870AA] cursor-pointer"
          }`}
        >
          {isPending ? "Salvando..." : "Cadastrar"}
        </button>

        <Link to={"/loginUsuario"}>
          <div className="text-[13px] text-center">
            <p>Já possui um cadastro?</p>
            <p className="text-sky-500 underline">
              Clique aqui entrar em sua conta!
            </p>
          </div>
        </Link>
      </form>
    </div>
  );
}

export default CadastroUsuario;
