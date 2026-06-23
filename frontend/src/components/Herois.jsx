import Card from "./Card.jsx";
import CadastrarHeroi from "./CadastrarHerois.jsx";
import CadastrarGuilda from "./CadastrarGuilda.jsx";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import PageTransition from "./PageTransition.jsx";
import { AnimatePresence, motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

function Herois() {
  const queryClient = useQueryClient();

  const [abrirModalHeroi, setAbrirModalHeroi] = useState(false);
  const [abrirModalGuilda, setAbrirModalGuilda] = useState(false);
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
    <PageTransition>
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
              onClick={() => setAbrirModalHeroi(true)}
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
            <button
              className="p-2 rounded text-white font-semibold bg-[#9870AA] cursor-pointer w-50"
              onClick={() => setAbrirModalGuilda(true)}
            >
              Criar novo Time!
            </button>
          </div>
          {abrirModalHeroi && (
            <CadastrarHeroi fecharModal={() => setAbrirModalHeroi(false)} />
          )}
          {abrirModalGuilda && (
            <CadastrarGuilda fecharModal={() => setAbrirModalGuilda(false)} />
          )}
        </div>

        <motion.div
          className="flex flex-wrap justify-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {heroisFiltrados.map((heroi) => (
              <motion.div
                key={heroi.id_heroi}
                variants={item}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -100,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <Card
                  key={heroi.id_heroi}
                  heroi={heroi}
                  dispensarHeroi={dispensarHeroi}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default Herois;
