function LogCard({ log }) {

  return (

    <div className="
      grid
      grid-cols-5
      items-center
      px-6
      py-4
      border-b
      border-slate-800
      hover:bg-slate-900/40
      transition-all
      duration-200
      text-sm
    ">

      <div className="text-white">
        {log.event}
      </div>

      <div className="text-slate-300">
        {log.user}
      </div>

      <div className="text-slate-400">
        {log.ip}
      </div>

      <div>

        <span className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold

          ${
            log.severity === 'HIGH'
              ? 'bg-red-500/10 text-red-400'
              : log.severity === 'MEDIUM'
              ? 'bg-yellow-500/10 text-yellow-400'
              : 'bg-green-500/10 text-green-400'
          }
        `}>

          {log.severity}

        </span>

      </div>

      <div className="
  text-slate-400
  text-sm
  whitespace-nowrap
">
  {log.timestamp}
</div>

    </div>
  );
}

export default LogCard;