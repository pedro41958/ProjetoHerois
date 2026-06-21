import Card from "./Card.jsx";
import CadastrarHeroi from "./CadastrarHerois.jsx";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "../api/api";

function Herois() {
  const queryClient = useQueryClient();

  const [abrirModal, setAbrirModal] = useState(false);
  const [busca, setBusca] = useState("");

  const { mutate } = useMutation({
    mutationFn: (id) => {
      return api.delete("/dispensarHeroi", {
        data: { id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["herois"] });
      alert("Corredora dispensada!");
    },

    onError: (erro) => {
      console.log(erro.response?.data);
      console.log(erro);
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["herois"],
    queryFn: async function listarHerois() {
      const { data } = await api.get("/listarHerois");
      return data;
    },
  });

  const heroisFiltrados = useMemo(() => {
    return (data || []).filter((heroi) =>
      heroi.nome.toLowerCase().includes(busca.toLowerCase()),
    );
  }, [data, busca]);

  function dispensarHeroi(id) {
    mutate(id);
  }

  if (isLoading)
    return (
      <div className="flex">
        <p>Carregando...</p>
      </div>
    );

  if (error) return "Erro!";

  return (
    <div className="bg-slate-100">
      <div className="text-center">
        <h1 className="bg-slate-500 text-white w-full text-center p-2 font-bold">
          Central de Comando
        </h1>
      </div>
      <div className="text-center">
        <h2 className="bg-slate-500 text-white w-full text-center p-2 font-semibold">
          Recrute Umamusumes e crie Times!
        </h2>
        <div className="flex justify-around bg-slate-600 text-white w-full text-center p-2 mb-6 font-semibold">
          <button
            className="p-2 rounded text-white font-semibold bg-[#9870AA] cursor-pointer w-50"
            onClick={() => setAbrirModal(true)}
          >
            Recrutar Umamusume!
          </button>
          <input
            className="bg-slate-300 w-105 text-black rounded p-2"
            type="text"
            placeholder="Buscar Umamusume por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className="p-2 rounded text-white font-semibold bg-[#9870AA] cursor-pointer w-50">
            Criar novo Time!
          </button>
        </div>
        {abrirModal && (
          <CadastrarHeroi fecharModal={() => setAbrirModal(false)} />
        )}
      </div>
      <div className="flex flex-wrap justify-center">
        {heroisFiltrados.map((heroi) => (
          <Card
            key={heroi.id_heroi}
            heroi={heroi}
            dispensarHeroi={dispensarHeroi}
          />
        ))}
      </div>
    </div>
  );
}

export default Herois;
