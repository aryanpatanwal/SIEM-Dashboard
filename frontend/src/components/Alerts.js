import {
  ShieldAlert
} from 'lucide-react';

function Alerts({ logs }) {

  const highAlerts =
    logs.filter(
      (log) =>
        log.severity === 'HIGH'
    );

  return (

    <div>

      <div className="mb-8">

        <h1 className="
          text-3xl
          font-bold
          text-white
        ">
          Security Alerts
        </h1>

        <p className="
          text-slate-400
          mt-2
        ">
          Critical incidents &
          threat monitoring
        </p>

      </div>

      <div className="
        bg-[#111827]
        border
        border-slate-800
        rounded-2xl
        overflow-hidden
      ">

        <div className="
          px-6
          py-5
          border-b
          border-slate-800
          flex
          items-center
          justify-between
        ">

          <h2 className="
            text-xl
            font-semibold
            text-white
          ">
            Active Threat Alerts
          </h2>

          <div className="
            px-3
            py-1
            rounded-full
            bg-red-500/10
            text-red-400
            text-sm
            font-semibold
          ">

            {highAlerts.length} Critical

          </div>

        </div>

        <div className="
          grid
          grid-cols-[2fr_1fr_1fr_1fr_1fr]
          px-6
          py-4
          text-xs
          uppercase
          tracking-wider
          text-slate-500
          border-b
          border-slate-800
          bg-slate-900/30
        ">

          <div>Threat</div>
          <div>User</div>
          <div>Source IP</div>
          <div>Severity</div>
          <div>Timestamp</div>

        </div>

        {highAlerts.map((alert) => (

          <div
            key={alert.id}
            className="
              grid
              grid-cols-[2fr_1fr_1fr_1fr_1fr]
              px-6
              py-4
              border-b
              border-slate-800
              hover:bg-slate-900/40
              transition-all
            "
          >

            <div className="
  flex
  items-center
  gap-3
  min-w-[280px]
">

  <ShieldAlert
    size={18}
    className="
      text-red-400
      flex-shrink-0
    "
  />

  <p className="
    text-white
    font-medium
    whitespace-nowrap
  ">
    {alert.event}
  </p>

</div>

            <div className="
              text-slate-300
            ">
              {alert.user}
            </div>

            <div className="
              text-slate-400
            ">
              {alert.ip}
            </div>

            <div>

              <span className="
                px-3
                py-1
                rounded-full
                bg-red-500/10
                text-red-400
                text-xs
                font-semibold
              ">

                HIGH

              </span>

            </div>

            <div className="
              text-slate-500
              text-sm
            ">
              {alert.timestamp}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Alerts;