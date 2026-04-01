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

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    fontFamily: "sans-serif",
  };

  const filtrosStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gap: "10px",
    justifyContent: "center",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const btnFilter = {
    color: "white",
    backgroundColor: "#404040",
    borderRadius: "15px",
    padding: "8px 15px",
    cursor: "pointer",
    border: "none",
    margin: "30px 0",
  };

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
        <div style={filtrosStyle}>
          <button style={btnFilter} onClick={filtrarInicio}>
            Início
          </button>
          <button style={btnFilter} onClick={filtrarMeio}>
            Meio
          </button>
          <button style={btnFilter} onClick={filtrarFinal}>
            Final
          </button>
          <button style={btnFilter} onClick={mostrarTodos}>
            Todos
          </button>
          <button style={btnFilter} onClick={restaurarPadrao}>
            Restaurar padrão
          </button>
        </div>
        <div style={containerStyle}>
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
