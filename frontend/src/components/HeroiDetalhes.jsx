import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import EditarHeroi from "./EditarHeroi";
import ListarMissoes from "./ListarMissoes";
import PageTransition from "./PageTransition";

function HeroiDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: heroi,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["heroi", id],
    queryFn: async () => {
      const { data } = await api.get(`/herois/${id}`);
      return data;
    },
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro!</p>;

  return (
    <PageTransition>
      <div className="flex flex-col items-center bg-slate-100 shadow-md h-screen">
        <h1 className="bg-slate-500 text-white w-full text-center p-2 mb-6 font-semibold">
          Detalhes de <strong>{heroi.nome}</strong>!
        </h1>
        <div className="grid grid-cols-3 gap-10 border-4 border-gray-400 rounded-xl p-4 m-2.5 shadow-md text-center h-3/5 bg-white">
          <div>
            <div>
              Poder: <strong>{heroi.poder}</strong>
            </div>

            <img
              src={heroi.url_imagem}
              alt={heroi.nome}
              className="border-4 border-gray-400 w-40 rounded-full mx-auto m-2 shadow-md"
            />

            <h2>
              <strong>{heroi.nome}</strong>
            </h2>

            <p className="m-5">
              Time: <strong>{heroi.nome_guilda}</strong>
            </p>

            <p className="m-5">
              Classe: <strong>{heroi.classe}</strong>
            </p>

            <button
              className="cursor-pointer m-2.5 bg-purple-500 text-white py-2 px-4 font-semibold rounded shadow-md"
              onClick={() => navigate("/herois")}
            >
              Sair
            </button>
          </div>
          <ListarMissoes />
          <EditarHeroi />
        </div>
      </div>
    </PageTransition>
  );
}

export default HeroiDetalhes;
