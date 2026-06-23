import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import api from "../api/api";

const schema = z.object({
  descricao: z.string().min(3, "Mínimo 3 caracteres!"),
  status: z.enum(["Em treinamento", "Vitória", "Derrota"], "Status inválido!"),
  recompensa_ouro: z.coerce.number().min(0, "Mínima recompensa 0!"),
  id_heroi: z.coerce.number().min(1, "Escolha uma Umamusume!"),
});

export default function CriarMissao({ fecharModal, idHeroi }) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    descricao: "",
    status: "",
    recompensa_ouro: "",
  });

  const [erros, setErros] = useState({});

  const { mutate, isPending } = useMutation({
    mutationFn: (novaMissao) => {
      return api.post("/criarMissao", novaMissao);
    },
    onSuccess: () => {
      alert("Corrida criada!");
      queryClient.invalidateQueries({
        queryKey: ["missoes", idHeroi],
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

    const dados = {
      ...formData,
      id_heroi: Number(idHeroi),
    };

    const resultado = schema.safeParse(dados);

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
        <input type="hidden" name="id_heroi" value={idHeroi} />

        <h2 className="text-x1 font-bold mb-4">Dados da Corrida</h2>

        <label htmlFor="descricao" className="text-center">
          Descrição:
          <input
            type="text"
            name="descricao"
            placeholder="Descrição"
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
          />
          {erros.descricao && (
            <p className="text-red-500">{erros.descricao._errors}</p>
          )}
        </label>

        <label htmlFor="status" className="text-center">
          Status da Corrida:
          <select
            name="status"
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2 cursor-pointer"
          >
            <option value="">Selecione o Status</option>
            <option value="Em treinamento">Em treinamento</option>
            <option value="Vitória">Vitória</option>
            <option value="Derrota">Derrota</option>
          </select>
          {erros.status && (
            <p className="text-red-500">{erros.status._errors}</p>
          )}
        </label>

        <label htmlFor="recompensa_ouro" className="text-center">
          Recompensa em Cenouras:
          <input
            type="number"
            name="recompensa_ouro"
            placeholder="Recompensa em Cenouras"
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
          />
          {erros.recompensa_ouro && (
            <p className="text-red-500">{erros.recompensa_ouro._errors}</p>
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
          {isPending ? "Registrando..." : "Registrar"}
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
