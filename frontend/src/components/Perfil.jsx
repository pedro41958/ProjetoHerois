import { useUsuario } from "../context/UsuarioContext";

function Perfil() {
  const { usuario } = useUsuario();

  return (
    <div className="flex flex-col items-center bg-slate-100 shadow-md h-screen">
      <h1 className="bg-slate-500 text-white w-full text-center p-2 mb-6 font-semibold">
        Bem-vindo treinador {usuario.nome}!
      </h1>
      <div className="flex flex-col bg-white p-6 rounded-xl shadow-md w-80 border-4 border-gray-400">
        <h1>Perfil do Treinador:</h1>
        <p>NOME: {usuario.nome}</p>
        <p>E-MAIL: {usuario.email}</p>
      </div>
    </div>
  );
}

export default Perfil;
