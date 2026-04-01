import Card from "./components/Card.jsx";
import Formulario from "./components/Formulario.jsx";
import heroisPadrao from "./components/HeroisPadrao.jsx";

import { useEffect, useState } from "react";

function App() {
  const [herois, setHerois] = useState(() => {
    const heroisTexto = localStorage.getItem("herois");

    if (heroisTexto) {
      return JSON.parse(heroisTexto);
    }

    return heroisPadrao;
  });

  function excluirHeroi(id) {
    const novoArray = herois.filter((heroi) => heroi.id != id);
    setHerois(novoArray);
    setLista(novoArray);
    alert("Herói removido!");
  }

  const [lista, setLista] = useState(herois);

  //Funções de cada personagem
  function filtrarInicio() {
    const inicio = herois.filter((heroi) => heroi.classe == "Início");
    setLista(inicio);
  }

  function filtrarMeio() {
    const meio = herois.filter((heroi) => heroi.classe == "Meio");
    setLista(meio);
  }

  function filtrarFinal() {
    const final = herois.filter((heroi) => heroi.classe == "Final");
    setLista(final);
  }

  function mostrarTodos() {
    setLista(herois);
  }

  function restaurarPadrao() {
    setHerois(heroisPadrao);
    setLista(heroisPadrao);
  }

  useEffect(() => {
    localStorage.setItem("herois", JSON.stringify(herois));
    setLista(herois);
  }, [herois]);

  return (
    <>
      <div className="text-center mt-5">
        <h1>SELEÇÃO DE CORREDORA</h1>
      </div>
      <div className="text-center">
        <h1 className="font-semibold">Recrute seu time</h1>
        <div className="grid grid-cols-5 gap-2.5 justify-center max-w-100 mx-auto">
          <button
            className="text-white bg-purple-500 rounded p-1 cursor-pointer border-none my-7.5 font-semibold"
            onClick={filtrarInicio}
          >
            Início
          </button>
          <button
            className="text-white bg-purple-500 rounded p-1 cursor-pointer border-none my-7.5 font-semibold"
            onClick={filtrarMeio}
          >
            Meio
          </button>
          <button
            className="text-white bg-purple-500 rounded p-1 cursor-pointer border-none my-7.5 font-semibold"
            onClick={filtrarFinal}
          >
            Final
          </button>
          <button
            className="text-white bg-purple-500 rounded p-1 cursor-pointer border-none my-7.5 font-semibold"
            onClick={mostrarTodos}
          >
            Todos
          </button>
          <button
            className="text-white bg-pink-500 rounded p-1 cursor-pointer border-none my-7.5 font-semibold"
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
    </>
  );
}

export default App;
