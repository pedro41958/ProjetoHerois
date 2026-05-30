import Card from "./components/Card.jsx";
import Formulario from "./components/Formulario.jsx";
import Logo from "./assets/avatar/logo.webp";
import { useQuery } from "@tanstack/react-query";
import listarHerois from "./api/api.js";
import { useEffect, useState } from "react";

function App() {
  const [herois, setHerois] = useState([]);
  const [lista, setLista] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["herois"],
    queryFn: listarHerois,
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

  function excluirHeroi(id) {
    const novoArray = herois.filter((heroi) => heroi.id != id);
    setHerois(novoArray);
    setLista(herois);
    alert("Herói removido!");
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

  function restaurarPadrao() {
    setHerois(data);
    setLista(data);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto w-130">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="text-center py-2">
        <h1 className="font-bold">SELEÇÃO DE CORREDORA</h1>
      </div>
      <div className="text-center">
        <h1 className="font-semibold">Recrute seu time</h1>
        <div className="grid grid-cols-5 gap-2.5 justify-center max-w-100 mx-auto">
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
            className="text-white bg-[#9870AA] rounded p-1 cursor-pointer border-none my-7.5 font-semibold"
            onClick={mostrarTodos}
          >
            Todos
          </button>
          <button
            className="text-white bg-[#D55883] rounded p-1 cursor-pointer border-none my-7.5 font-semibold"
            onClick={restaurarPadrao}
          >
            Padrão
          </button>
        </div>
        <div className="flex flex-wrap justify-center">
          {lista.map((heroi) => (
            <Card key={heroi.id} heroi={heroi} excluirHeroi={excluirHeroi} />
          ))}
        </div>
        <Formulario herois={herois} setHerois={setHerois} />
      </div>
    </div>
  );
}

export default App;
