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

function CadastroUsuario() {
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
          <option value="null">Selecione a Classe</option>
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

        <select
          name="status"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2 cursor-pointer"
        >
          <option value="null">Selecione o Status</option>
          <option value="online">Online</option>
          <option value="ausente">Ausente</option>
          <option value="offline">Offline</option>
        </select>
        {erros.status && <p className="text-red-500">{erros.status._errors}</p>}

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
