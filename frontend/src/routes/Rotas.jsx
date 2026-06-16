import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import LoginUsuario from "../components/LoginUsuario";
import CadastroUsuario from "../components/CadastroUsuario";
import Perfil from "../components/Perfil";
import Herois from "../components/Herois";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<LoginUsuario />} />
      <Route path="/loginUsuario" element={<LoginUsuario />} />
      <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        }
      />
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
