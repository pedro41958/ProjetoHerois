import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import api from "../api/api";

const schema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
});

export default function CadastrarGuilda({ fecharModal }) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    nome: "",
  });

  const [erros, setErros] = useState({});

  const { mutate, isPending } = useMutation({
    mutationFn: (novaGuilda) => {
      return api.post("/criarGuilda", novaGuilda);
    },
    onSuccess: () => {
      alert("Time criado!");
      queryClient.invalidateQueries({
        queryKey: ["guildas"],
      });
      fecharModal();
    },

    onError: (erro) => {
      console.log(erro.response?.data);
      alert("Erro ao cadastrar.");
    },
  });

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

      console.log(resultado.data);
      mutate(resultado.data);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center shadow-md h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded-xl shadow-md w-80 border-4 border-gray-400"
      >
        <input type="hidden" name="id" />

        <h2 className="text-x1 font-bold mb-4">Dados do Time</h2>

        <label htmlFor="nome" className="text-center">
          Nome do Time:
          <input
            type="text"
            name="nome"
            placeholder="Nome do Time"
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
          />
          {erros.nome && <p className="text-red-500">{erros.nome._errors}</p>}
        </label>

        <button
          disabled={isPending}
          className={`p-2 m-5 rounded text-white font-semibold ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#9870AA] cursor-pointer"
          }`}
        >
          {isPending ? "Criando..." : "Criar"}
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
