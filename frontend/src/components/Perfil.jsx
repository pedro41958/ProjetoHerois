import { useUsuario } from "../context/UsuarioContext";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EditarPerfil from "./EditarPerfil";
import api from "../api/api";
import PageTransition from "./PageTransition";

function Perfil() {
  const { usuario } = useUsuario();
  const [abrirModal, setAbrirModal] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["dados"],
    queryFn: async function trazerDados() {
      const { data } = await api.get("/trazerDados");
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

  return (
    <PageTransition>
      <div className="flex flex-col items-center bg-slate-100 shadow-md h-screen">
        <h1 className="bg-slate-500 text-white w-full text-center p-2 mb-6 font-semibold">
          Bem-vindo treinador <strong>{usuario.nome}</strong>!
        </h1>

        <div className="flex flex-row justify-between w-200">
          <div className="flex flex-col items-center bg-white rounded-xl shadow-md border-4 border-gray-400 w-55 font-semibold">
            <p>Umamusumes recrutadas:</p>
            <p className="font-normal">{data.total_herois}</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-xl shadow-md border-4 border-gray-400 w-55 font-semibold">
            <p>Média de poder:</p>
            <p className="font-normal">{data.media_poder}</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-xl shadow-md border-4 border-gray-400 w-55 font-semibold">
            <p>Time mais forte:</p>
            <p className="font-normal">{data.guilda_mais_forte}</p>
          </div>
        </div>

        <div className="flex flex-col mt-10 bg-white rounded-xl shadow-md border-4 border-gray-400 w-96">
          <h1 className="bg-slate-500 text-white w-full text-center p-2 mb-6 font-semibold rounded-t-lg">
            Perfil do Treinador
          </h1>
          <p className="m-5">
            <span className="font-bold mr-10">NOME:</span>
            {usuario.nome}
          </p>
          <p className="m-5">
            <span className="font-bold mr-9">E-MAIL:</span>
            {usuario.email}
          </p>

          <button
            className="p-2 m-5 rounded text-white font-semibold bg-[#9870AA] cursor-pointer"
            onClick={() => setAbrirModal(true)}
          >
            Editar Perfil
          </button>
        </div>
        {abrirModal && (
          <EditarPerfil fecharModal={() => setAbrirModal(false)} />
        )}
      </div>
    </PageTransition>
  );
}

export default Perfil;
