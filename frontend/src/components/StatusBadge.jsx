function StatusBadge({ tipo }) {
  const estilos = {
    online: "bg-lime-500",
    offline: "bg-cyan-950",
    ausente: "bg-yellow-300",
  };

  return (
    <div className="flex items-center gap-2 bg-slate-500 p-2 rounded-lg w-fit">
      <div
        className={`w-3 h-3 rounded-full shadow-sm ${estilos[tipo] || estilos.offline}`}
      ></div>
      <span className="text-xs font-bold uppercase text-slate-200">{tipo}</span>
    </div>
  );
}

export default StatusBadge;
