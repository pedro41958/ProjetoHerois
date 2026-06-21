import Card from "./Card.jsx";
import Formulario from "./Formulario.jsx";
import listarHerois from "../api/api.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

function Herois() {
  const queryClient = useQueryClient();

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

  const [herois, setHerois] = useState([]);
  const [lista, setLista] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["herois"],
    queryFn: async function listarHerois() {
      const { data } = await api.get("/listarHerois");
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      setHerois(data);
      setLista(data);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="flex">
        <p>Carregando...</p>
      </div>
    );

  if (error) return "Erro!";

  function dispensarHeroi(id) {
    mutate(id);
  }

  //Funções de cada personagem
  function filtrarMile() {
    const mile = herois.filter((heroi) => heroi.classe == "Mile");
    setLista(mile);
  }

  function filtrarMedium() {
    const medium = herois.filter((heroi) => heroi.classe == "Medium");
    setLista(medium);
  }

  function filtrarLong() {
    const long = herois.filter((heroi) => heroi.classe == "Long");
    setLista(long);
  }

  function mostrarTodos() {
    setLista(herois);
  }

  return (
    <div className="bg-slate-100">
      <div className="text-center py-2">
        <h1 className="font-bold">SELEÇÃO DE CORREDORA</h1>
      </div>
      <div className="text-center">
        <h1 className="font-semibold">Recrute seu time!</h1>
        <div className="grid grid-cols-4 gap-2.5 justify-center max-w-100 mx-auto">
          <button
            className="text-white bg-[#9870AA] rounded p-1 cursor-pointer border-none my-7.5 font-semibold"
            onClick={filtrarMile}
          >
            Mile
          </button>
          <button
            className="text-white bg-[#9870AA] rounded p-1 cursor-pointer border-none my-7.5 font-semibold"
            onClick={filtrarMedium}
          >
            Medium
          </button>
          <button
            className="text-white bg-[#9870AA] rounded p-1 cursor-pointer border-none my-7.5 font-semibold"
            onClick={filtrarLong}
          >
            Long
          </button>
          <button
            className="text-white bg-[#D786B0] rounded p-1 cursor-pointer border-none my-7.5 font-semibold"
            onClick={mostrarTodos}
          >
            Todos
          </button>
        </div>
        <div className="flex flex-wrap justify-center">
          {lista.map((heroi) => (
            <Card
              key={heroi.id_heroi}
              heroi={heroi}
              dispensarHeroi={dispensarHeroi}
            />
          ))}
        </div>
        <Formulario />
      </div>
    </div>
  );
}

export default Herois;
