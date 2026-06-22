import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

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
    <div className="border-4 border-gray-400 rounded-xl p-4 m-2.5 shadow-md text-center w-50 bg-white">
      <div>
        Poder: <strong>{heroi.poder}</strong>
      </div>

      <img
        src={heroi.url_imagem}
        alt={heroi.nome}
        className="w-full rounded-full mx-auto m-2 shadow-md"
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
        className="cursor-pointer m-2.5 mt-8 bg-purple-500 text-white py-2 px-4 rounded shadow-md"
        onClick={() => navigate("/herois")}
      >
        Sair
      </button>

      <button
        className="cursor-pointer ml-2.5 bg-rose-500 text-white py-2 px-4 rounded shadow-md"
        onClick={() => console.log("aqui você chama dispensarHeroi")}
      >
        Dispensar
      </button>
    </div>
  );
}

export default HeroiDetalhes;
