import { useState } from "react";
import { set, z } from "zod";

/*
const schema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha mínima de 6 caracteres"),
});

export default function Formulario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [erros, setErros] = useState({});

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const result = schema.safeParse(formData);
    if (!result.success) {
      setErros(result.error.format());
    } else {
      setErros({});
      alert("Formulário enviado com sucesso!");
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-x1 font-bold mb-4">Cadastro</h2>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
        {erros.nome && <p className="text-red-500">{erros.nome._errors}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
        {erros.email && <p className="text-red-500">{erros.email._errors}</p>}

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
        {erros.senha && <p className="text-red-500">{erros.senha._errors}</p>}

        <button className="m-2.5 bg-blue-600 text-white py-2 px-4 rounded">
          Enviar!
        </button>
      </form>
    </div>
  );
}
*/

export default function Formulario() {
  const [dados, setDados] = useState({
    nome: "",
    classe: "",
  });

  function handleChange(e) {
    const novosDados = {
      ...dados,
      [e.target.name]: e.target.value,
    };

    setDados(novosDados);

    console.log(novosDados);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(dados);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nome">
        Nome
        <input name="nome" value={dados.nome} onChange={handleChange} />
      </label>
      <label htmlFor="nome">
        Classe
        <input name="classe" value={dados.classe} onChange={handleChange} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}
