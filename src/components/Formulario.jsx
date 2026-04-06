import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(3, "Nome muito curto!"),
  classe: z.string().min(4, "Classe muito curta!"),
});

export default function Formulario({ herois, setHerois }) {
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    classe: "",
    imagem: "",
    status: "",
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

      const novoHeroi = {
        ...formData,
        id: herois.length + 1,
      };

      setHerois([...herois, novoHeroi]);
      console.log("Um novo herói foi validado e salvo!");

      alert("Formulário enviado com sucesso!");
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-200 p-5 shadow-md">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 border-4 border-gray-400"
      >
        <input type="hidden" name="id" />

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
          type="text"
          name="classe"
          placeholder="Classe"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
        {erros.classe && <p className="text-red-500">{erros.classe._errors}</p>}

        <input
          type="file"
          name="imagem"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />

        <select
          name="status"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="online">Online</option>
          <option value="ausente">Ausente</option>
          <option value="offline">Offline</option>
        </select>

        <button className="w-full bg-purple-500 text-white py-2 px-4 rounded shadow-md">
          Enviar
        </button>
      </form>
    </div>
  );
}

/*
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

      <input type="file" />

      <button type="submit">Enviar</button>
    </form>
  );
}
*/
