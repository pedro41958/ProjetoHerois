import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // Se não tem token, redireciona para login
  if (!token) {
    return <Navigate to="/loginUsuario" replace />;
  }

  return children;
}

export default PrivateRoute;
