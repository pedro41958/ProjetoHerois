import { Routes, Route } from "react-router-dom";

import Herois from "../components/Herois";
import LoginUsuario from "../components/LoginUsuario";
import CadastroUsuario from "../components/CadastroUsuario";

function Rotas() {
  return (
    <Routes>
      <Route path="/loginUsuario" element={<LoginUsuario />} />
      <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
      <Route path="/herois" element={<Herois />} />
    </Routes>
  );
}

export default Rotas;
