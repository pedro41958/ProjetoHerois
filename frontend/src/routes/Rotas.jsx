import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Herois from "../components/Herois";
import LoginUsuario from "../components/LoginUsuario";
import CadastroUsuario from "../components/CadastroUsuario";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<LoginUsuario />} />
      <Route path="/loginUsuario" element={<LoginUsuario />} />
      <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
      <Route
        path="/herois"
        element={
          <PrivateRoute>
            <Herois />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default Rotas;
