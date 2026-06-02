import NavBar from "./components/NavBar.jsx";
import { useState } from "react";
import Herois from "./components/Herois.jsx";

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState("cadastro");

  function mudarPagina() {
    if (paginaAtiva === "herois") {
      return <Herois />;
    }
  }

  return (
    <>
      <div className="">
        <NavBar mudarPagina={setPaginaAtiva} />
        {mudarPagina()}
      </div>
    </>
  );
}

export default App;
