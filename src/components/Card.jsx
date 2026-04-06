import { useState } from "react";
import StatusBadge from "./StatusBadge";

function Card({ heroi, excluirHeroi }) {
  const [xp, setXp] = useState(0);
  const [nivel, setNivel] = useState(0);
  const [mostrarMsg, setMostrarMsg] = useState(false);
  const [selecionado, setSelecionado] = useState(false);
  const [levelUp, setLevelUp] = useState(false);

  let cor = "border-4 border-gray-400";

  if (xp === 100) {
    setTimeout(() => {
      setLevelUp(true);
      setXp(0);
      setNivel(nivel + 1);
      setMostrarMsg(true);

      setTimeout(() => {
        setLevelUp(false);
      }, 900);

      setTimeout(() => {
        setMostrarMsg(false);
      }, 1600);
    }, 150);
  }

  if (levelUp === true) {
    cor = "border-4 border-amber-300";
  } else if (selecionado === true) {
    cor = "border-4 border-blue-400";
  } else if (selecionado === false) {
    cor = "border-4 border-gray-400";
  }

  return (
    <div
      className={`${cor} rounded-xl p-4 m-2.5 shadow-md text-center w-50 bg-white `}
      onClick={(e) => {
        const clicouEmBotao = e.target.closest("button");

        if (clicouEmBotao) {
          // se clicou no botão, só ativa (não desativa)
          if (!selecionado) {
            setSelecionado(true);
          }
        } else {
          // clique normal no card alterna
          setSelecionado(!selecionado);
        }
      }}
    >
      <div className="flex justify-center mb-4">
        <StatusBadge tipo={heroi.status} />
      </div>
      <div
        className={`gap-1 shadow-md fixed top-3 left-1/2 -translate-x-1/2 flex justify-center mb-4 bg-white border-3 border-green-400 text-black px-5 py-2.5 rounded-lg ${mostrarMsg ? "" : "hidden"}`}
      >
        <strong>{heroi.nome}</strong> subiu de nível!
      </div>
      <div>
        Nível: <strong>{nivel}</strong>
      </div>
      <img
        src={heroi.imagem}
        alt={heroi.nome}
        className={`w-full rounded-full mx-auto ${cor} m-2 shadow-md`}
      />
      <h2>
        <strong>{heroi.nome}</strong>
      </h2>
      <p className="m-5">
        Classe: <strong>{heroi.classe}</strong>
      </p>

      <div className="w-full h-2.5 rounded bg-gray-600">
        <div
          className="h-2.5 rounded bg-green-400 transition-all duration-300"
          style={{ width: `${xp}%` }}
        ></div>
      </div>

      <button
        className="m-2.5 bg-green-400 text-white py-2 px-4 rounded shadow-md"
        onClick={() => setXp(xp + 10)}
      >
        +10 XP
      </button>

      <div>XP: {xp}/100</div>

      <button
        className="m-2.5 mt-8 bg-purple-500 text-white py-2 px-4 rounded shadow-md"
        onClick={() => alert(`Você recrutou ${heroi.nome} para o seu time!`)}
      >
        Recrutar!
      </button>

      <button
        className="ml-2.5 mr-2.5 mb-2.5 mt-0.5 bg-rose-500 text-white py-2 px-4 rounded shadow-md"
        onClick={() => excluirHeroi(heroi.id)}
      >
        Excluir
      </button>
    </div>
  );
}

export default Card;
