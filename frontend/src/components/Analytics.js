import {
  ShieldAlert,
  Globe,
  Activity,
  ServerCrash
} from 'lucide-react';

function Analytics({ logs }) {

  const topIPs = {};

  logs.forEach((log) => {

    topIPs[log.ip] =
      (topIPs[log.ip] || 0) + 1;

  });

  const sortedIPs =
    Object.entries(topIPs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

  const highAlerts =
    logs.filter(
      (log) =>
        log.severity === 'HIGH'
    ).length;

  const failedLogins =
    logs.filter(
      (log) =>
        log.event === 'Authentication Failure'
    ).length;

  const successfulLogins =
    logs.filter(
      (log) =>
        log.event ===
        'Successful Login'
    ).length;

  const analyticsCards = [
    {
      title: 'Critical Incidents',
      value: highAlerts,
      icon: <ShieldAlert size={22} />,
      color: 'from-red-500 to-red-700'
    },
    {
      title: 'Failed Logins',
      value: failedLogins,
      icon: <ServerCrash size={22} />,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'Successful Logins',
      value: successfulLogins,
      icon: <Activity size={22} />,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Unique Attack Sources',
      value:
        Object.keys(topIPs).length,
      icon: <Globe size={22} />,
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  return (

    <div>

      <div className="mb-8">

        <h1 className="
          text-3xl
          font-bold
          text-white
        ">
          Security Analytics
        </h1>

        <p className="
          text-slate-400
          mt-2
        ">
          Threat metrics &
          attack intelligence
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-5
      ">

        {analyticsCards.map(
          (card, index) => (

          <div
            key={index}
            className="
              bg-[#111827]
              border
              border-slate-800
              rounded-2xl
              p-5
            "
          >

            <div className="
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="
                  text-slate-400
                  text-sm
                  mb-2
                ">
                  {card.title}
                </p>

                <h1 className="
                  text-3xl
                  font-bold
                  text-white
                ">
                  {card.value}
                </h1>

              </div>

              <div className={`
                w-12
                h-12
                rounded-xl
                bg-gradient-to-br
                ${card.color}
                flex
                items-center
                justify-center
                text-white
              `}>

                {card.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="
        mt-8
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
        ">

          <h2 className="
            text-xl
            font-semibold
            text-white
          ">
            Top Attacking IPs
          </h2>

        </div>

        <div className="
          grid
          grid-cols-2
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

          <div>IP Address</div>
          <div>Attack Count</div>

        </div>

        {sortedIPs.map((ip, index) => (

          <div
            key={index}
            className="
              grid
              grid-cols-2
              px-6
              py-4
              border-b
              border-slate-800
              hover:bg-slate-900/40
              transition-all
            "
          >

            <div className="text-white">
              {ip[0]}
            </div>

            <div className="
              text-red-400
              font-semibold
            ">
              {ip[1]}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Analytics;