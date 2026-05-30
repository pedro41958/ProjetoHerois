import React, { useState } from "react";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensagem(`Usuário ${data.usuario.nome} cadastrado com sucesso!`);
        setNome("");
        setEmail("");
        setSenha("");
      } else {
        setMensagem("Erro: " + data.erro);
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Criar Conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Junte-se a nós para começar!
          </p>
        </div>
        <form onSubmit={handleCadastro}>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              required
              placeholder="Gustavo Dias"
              className="w-full border px-4 py-2 mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 foucus:outline-none"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              required
              placeholder="gustavo.dias@email.com"
              className="w-full border px-4 py-2 mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 foucus:outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              required
              placeholder="Digite sua senha"
              className="w-full border px-4 py-2 mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 foucus:outline-none transition-all"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Cadastrar
          </button>
        </form>

        {mensagem && (
          <div
            className={`p-3 rounded-md text-center text-sm font-medium ${mensagem.includes("sucesso") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {mensagem}
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-500">
            <a href="/login" className="text-blue-600 hover:underline">
              Já tem uma conta? Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
