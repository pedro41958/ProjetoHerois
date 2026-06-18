import { NavLink } from "react-router-dom";
import Logo from "../assets/avatar/logo.webp";
import { useUsuario } from "../context/UsuarioContext";

function NavBar() {
  const { setUsuario } = useUsuario();

  const botaoUsuario =
    "flex justify-center bg-[#DB4E81] text-white rounded p-1 cursor-pointer border-none my-3 font-semibold w-35";

  const botaoUsuarioSelecionado =
    "flex justify-center bg-[#FBCEC3] text-zinc-700 rounded p-1 cursor-pointer border-none my-3 font-semibold w-35";

  const menu = [
    { id: "login", texto: "Login", path: "/loginUsuario", protegido: false },
    {
      id: "cadastro",
      texto: "Cadastro",
      path: "/cadastroUsuario",
      protegido: false,
    },
    { id: "perfil", texto: "Perfil", path: "/perfil", protegido: true },
    { id: "herois", texto: "Umamusumes", path: "/herois", protegido: true },
  ];

  const token = localStorage.getItem("token");

  return (
    <div className="w-auto h-auto bg-slate-300">
      <div className="mx-auto w-130">
        <img draggable="false" src={Logo} alt="Logo" />
      </div>
      <div className="relative w-full h-16 bg-slate-400">
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-4">
          {menu.map((botao) => {
            if (botao.protegido && !token) return null;
            if (!botao.protegido && token) return null;

            return (
              <NavLink
                key={botao.id}
                to={botao.path}
                className={({ isActive }) =>
                  isActive ? botaoUsuarioSelecionado : botaoUsuario
                }
              >
                {botao.texto}
              </NavLink>
            );
          })}
        </div>
        {token && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#DB4E81] text-white rounded p-1 font-semibold w-20 cursor-pointer"
            onClick={() => {
              (localStorage.removeItem("token"),
                setUsuario(null),
                location.reload());
            }}
          >
            Sair
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
