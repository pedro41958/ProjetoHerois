import { Routes, Route } from "react-router-dom";

import Herois from "../components/Herois";

function Rotas() {
  return (
    <Routes>
      <Route path="/herois" element={<Herois />} />
    </Routes>
  );
}

export default Rotas;
