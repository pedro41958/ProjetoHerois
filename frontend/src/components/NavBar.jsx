import Logo from "../assets/avatar/logo.webp";

function NavBar({ mudarPagina }) {
  const botaoUsuario =
    "bg-[#DB4E81] text-white rounded p-1 cursor-pointer border-none my-7.5 font-semibold";

  const menu = [
    { id: "login", texto: "Login" },
    { id: "cadastro", texto: "Cadastro" },
    { id: "herois", texto: "Umamusumes" },
  ];

  return (
    <div className="w-auto h-auto bg-slate-300">
      <div className="mx-auto w-130">
        <img draggable="false" src={Logo} alt="Logo" />
      </div>
      <div className="bg-slate-400">
        <div className="grid grid-cols-3 gap-2.5 justify-center max-w-100 mx-auto">
          {menu.map((botao) => (
            <button
              key={botao.id}
              onClick={mudarPagina(botao.id)}
              className={`${botaoUsuario}`}
            >
              {botao.texto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
