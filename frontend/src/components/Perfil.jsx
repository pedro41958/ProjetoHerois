function Perfil() {
  return (
    <div className="flex flex-col items-center bg-slate-100 shadow-md h-screen">
      <h1 className="bg-slate-500 text-white w-full text-center p-2 mb-6 font-semibold">
        Bem-vindo treinador!
      </h1>
      <div className="flex flex-col bg-white p-6 rounded-xl shadow-md w-80 border-4 border-gray-400">
        <h1>Perfil do Treinador:</h1>
        <p>NOME:</p>
        <p>E-MAIL:</p>
      </div>
    </div>
  );
}

export default Perfil;
