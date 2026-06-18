import { createContext, useContext, useState } from "react";

const UsuarioContext = createContext(null);

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const salvo = localStorage.getItem("usuario");
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      localStorage.removeItem("usuario");
      return null;
    }
  });

  function SetUsuario(usuario) {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
    setUsuario(usuario);
  }

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario: SetUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UsuarioContext);
}
