import Inicio from "../assets/avatar/silencesuzuka.jpg";
import Meio from "../assets/avatar/specialweek.jpg";
import Final from "../assets/avatar/golshi.jpg";
import Inicio1 from "../assets/avatar/tokaiteio.jpg";
import Meio1 from "../assets/avatar/mejiromcqueen.png";
import Final1 from "../assets/avatar/riceshower.jpg";

const heroisPadrao = [
  {
    id: 1,
    nome: "Special Week",
    classe: "Meio",
    imagem: Meio,
    status: "online",
  },

  {
    id: 2,
    nome: "Silence Suzuka",
    classe: "Início",
    imagem: Inicio,
    status: "ausente",
  },

  {
    id: 3,
    nome: "Gold Ship",
    classe: "Final",
    imagem: Final,
    status: "offline",
  },

  {
    id: 4,
    nome: "Mejiro Mcqueen",
    classe: "Meio",
    imagem: Meio1,
    status: "offline",
  },

  {
    id: 5,
    nome: "Tokai Teio",
    classe: "Início",
    imagem: Inicio1,
    status: "ausente",
  },

  {
    id: 6,
    nome: "Rice Shower",
    classe: "Final",
    imagem: Final1,
    status: "online",
  },
];

export default heroisPadrao;
