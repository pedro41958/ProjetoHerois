import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { tr } from "zod/v4/locales";
import CriarMissao from "./CriarMissao";

function ListarMissoes() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [abrirModal, setAbrirModal] = useState(false);

  const {
    data: missoes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["missoes", id],
    queryFn: async function istarMissoes() {
      const { data } = await api.get(`/herois/${id}/missoes`);

      return data;
    },
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro!</p>;

  return (
    <div className="flex flex-col justify-between items-center bg-white pb-6 rounded-xl shadow-md w-auto border-4 border-gray-400">
      <h1 className="bg-slate-500 text-white w-full text-center rounded-t-lg p-2 mb-6 font-semibold">
        Histórico de Corridas
      </h1>
      <table className="w-auto border-collapse bg-white rounded-lg overflow-hidden shadow-md m-10">
        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="px-4 py-3 text-center">Descrição</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Recompensa</th>
          </tr>
        </thead>

        <tbody>
          {missoes.map((missao) => (
            <tr key={missao.id_missao} className="border-b border-gray-600">
              <td className="px-4 py-3">{missao.descricao}</td>

              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    missao.status === "Vitória"
                      ? "bg-green-100 text-green-700"
                      : missao.status === "Derrota"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {missao.status}
                </span>
              </td>

              <td className="px-4 py-3 font-semibold">
                {missao.recompensa_ouro} Cenouras
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="p-2 rounded text-white font-semibold bg-[#9870AA] cursor-pointer w-50"
        onClick={() => setAbrirModal(true)}
      >
        Registrar Corrida
      </button>
      {abrirModal && (
        <CriarMissao fecharModal={() => setAbrirModal(false)} idHeroi={id} />
      )}
    </div>
  );
}

export default ListarMissoes;
