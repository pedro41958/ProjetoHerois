import { Link } from "react-router-dom";
import Logo from "../assets/avatar/logo.webp";

function NavBar() {
  const botaoUsuario =
    "flex justify-center bg-[#DB4E81] text-white rounded p-1 cursor-pointer border-none my-7.5 font-semibold";

  const menu = [
    { id: "login", texto: "Login", path: "/loginUsuario" },
    { id: "cadastro", texto: "Cadastro", path: "/cadastroUsuario" },
    { id: "herois", texto: "Umamusumes", path: "/herois" },
  ];

  return (
    <div className="w-auto h-auto bg-slate-300">
      <div className="mx-auto w-130">
        <img draggable="false" src={Logo} alt="Logo" />
      </div>
      <div className="bg-slate-400">
        <div className="grid grid-cols-3 gap-2.5 justify-center max-w-100 mx-auto">
          {menu.map((botao) => (
            <Link key={botao.id} to={botao.path} className={`${botaoUsuario}`}>
              {botao.texto}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
