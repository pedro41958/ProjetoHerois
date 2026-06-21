import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import api from "../api/api";

const schema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  classe: z.enum(["Sprint", "Mile", "Medium", "Long"], "Classe inválida!"),
  poder: z.coerce
    .number()
    .min(0, "Mínimo poder 0!")
    .max(100, "Máximo poder 100!"),
  url_imagem: z.string().trim().min(1, "Insira a URL de uma imagem!"),
  id_guilda: z.coerce.number().min(1, "Escolha um time!"),
});

export default function Formulario() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    nome: "",
    classe: "",
    poder: "",
    url_imagem: "",
    id_guilda: "",
  });

  const [erros, setErros] = useState({});

  const { mutate, isPending } = useMutation({
    mutationFn: (novoHeroi) => {
      return api.post("/cadastrarHeroi", novoHeroi);
    },
    onSuccess: () => {
      alert("Herói cadastrado!");
      queryClient.invalidateQueries({
        queryKey: ["herois"],
      });
    },

    onError: (erro) => {
      console.log(erro.response?.data);
      alert("Erro ao cadastrar.");
    },
  });

  const {
    data: guildas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guildas"],
    queryFn: async function buscarGuildas() {
      const { data } = await api.get("/buscarGuildas");
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="flex">
        <p>Carregando...</p>
      </div>
    );

  if (error) return "Erro!";

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
    <div className="flex items-center justify-center bg-slate-200 p-5 shadow-md">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80 border-4 border-gray-400"
      >
        <input type="hidden" name="id" />

        <h2 className="text-x1 font-bold mb-4">Cadastro</h2>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
        {erros.nome && <p className="text-red-500">{erros.nome._errors}</p>}

        <select
          name="classe"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2 cursor-pointer"
        >
          <option value="">Selecione uma Classe</option>
          <option value="Sprint">Sprint</option>
          <option value="Mile">Mile</option>
          <option value="Medium">Medium</option>
          <option value="Long">Long</option>
        </select>
        {erros.classe && <p className="text-red-500">{erros.classe._errors}</p>}

        <input
          type="number"
          name="poder"
          placeholder="Poder"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
        {erros.poder && <p className="text-red-500">{erros.poder._errors}</p>}

        <input
          type="url"
          name="url_imagem"
          placeholder="URL da imagem"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
        {erros.url_imagem && (
          <p className="text-red-500">{erros.url_imagem._errors}</p>
        )}

        <select
          name="id_guilda"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2 cursor-pointer"
        >
          <option value="">Selecione uma Guilda</option>

          {guildas.map((guilda) => (
            <option key={guilda.id_guilda} value={guilda.id_guilda}>
              {guilda.nome}
            </option>
          ))}
        </select>
        {erros.id_guilda && (
          <p className="text-red-500">{erros.id_guilda._errors}</p>
        )}

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
