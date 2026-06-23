import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import api from "../api/api";

const schema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres!"),
  classe: z.enum(["Sprint", "Mile", "Medium", "Long"], "Classe inválida!"),
  poder: z.coerce.number().min(0, "Mínimo poder 0!"),
});

function EditarHeroi({ fecharModal }) {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: (heroiEditado) => {
      return api.put(`/herois/${id}`, heroiEditado);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["herois", id] });
      alert("Umamusume atualizada com sucesso!");
      location.reload();
    },
    onError: (error) => {
      alert(error.response?.data);
    },
  });

  const [formData, setFormData] = useState({
    nome: "",
    classe: "",
    poder: "",
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
    <div className="flex flex-col items-center shadow-md h-full rounded-xl w-70 border-4 border-gray-400">
      <h2 className="bg-slate-500 text-white w-full text-center rounded-t-lg p-2 font-semibold">
        Editar dados da Umamusume
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between bg-white p-6 w-auto rounded-xl"
      >
        <input type="hidden" name="id" />

        <label htmlFor="nome" className="text-center">
          Nome:
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
          />
          {erros.nome && <p className="text-red-500">{erros.nome._errors}</p>}
        </label>

        <label htmlFor="classe" className="text-center">
          Classe:
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
          {erros.classe && (
            <p className="text-red-500">{erros.classe._errors}</p>
          )}
        </label>

        <label htmlFor="poder" className="text-center">
          Poder:
          <input
            type="number"
            name="poder"
            placeholder="Poder"
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
          />
          {erros.poder && <p className="text-red-500">{erros.poder._errors}</p>}
        </label>

        <button
          disabled={isPending}
          className={`p-2 m-5 rounded text-white font-semibold ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#9870AA] cursor-pointer"
          }`}
        >
          {isPending ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}

export default EditarHeroi;
