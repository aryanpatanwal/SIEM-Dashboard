import { useEffect, useState } from 'react';
import AttackMap from './AttackMap';

import {
  ShieldAlert,
  Globe,
  Radar
} from 'lucide-react';

function ThreatIntel() {

  const [threats, setThreats] = useState([]);
  useEffect(() => {

  fetch(
  `${process.env.REACT_APP_API_URL}/logs`,
  {
    headers: {
      Authorization:
        `Bearer ${localStorage.getItem('token')}`
    }
  }
)
    .then((res) => res.json())
    .then(async (logs) => {

      const uniqueIPs = [
        ...new Set(
          logs.map((log) => log.ip)
        )
      ];

      const enrichedThreats =
        await Promise.all(

          uniqueIPs.map(async (ip) => {
            if (
  ip === '127.0.0.1' ||
  ip.startsWith('192.168.') ||
  ip.startsWith('10.') ||
  /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
) {

  return {
    ip,
    country: 'Localhost',
    severity: 'HIGH',
    type: 'Internal Threat Activity'
  };

}
            try {

              const response =
                await fetch(
                  `http://ip-api.com/json/${ip}`
                );

              const data =
                await response.json();

              return {
                ip,
                country:
                  data.country ||
                  'Unknown',
                severity: 'HIGH',
                type: 'Suspicious Activity'
              };

            } catch {

              return {
                ip,
                country: 'Unknown',
                severity: 'HIGH',
                type: 'Unknown Threat'
              };

            }

          })

        );

      setThreats(enrichedThreats);

    });

}, []);

  const stats = [
    {
      title: 'Threat Feeds',
      value: threats.length,
      icon: <Radar size={22} />,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'High Risk IPs',
      value:
        threats.filter(
          (t) => t.severity === 'HIGH'
        ).length,
      icon: <ShieldAlert size={22} />,
      color: 'from-red-500 to-red-700'
    },
    {
      title: 'Flagged Countries',
      value: [
  ...new Set(
    threats.map(
      (threat) => threat.country
    )
  )
].length,
      icon: <Globe size={22} />,
      color: 'from-orange-500 to-yellow-500'
    }
  ];

  return (

    <div>

      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
            text-white
          ">
            Threat Intelligence
          </h1>

          <p className="
            text-slate-400
            mt-1
            text-sm
          ">
            Global threat monitoring &
            malicious activity feeds
          </p>

        </div>

      </div>

      <div className="
        grid
        grid-cols-1 md:grid-cols-2 xl:grid-cols-3
        gap-5
        mb-6
      ">

        {stats.map((stat, index) => (

          <div
            key={index}
            className="
              bg-[#111827]
              border
              border-slate-800
              rounded-2xl
              p-5
              hover:border-slate-700
              transition-all
              duration-300
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
                  {stat.title}
                </p>

                <h1 className="
                  text-3xl
                  font-bold
                  text-white
                ">
                  {stat.value}
                </h1>

              </div>

              <div className={`
                w-12
                h-12
                rounded-xl
                bg-gradient-to-br
                ${stat.color}
                flex
                items-center
                justify-center
                text-white
              `}>

                {stat.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="
        bg-[#111827]
        border
        border-slate-800
        rounded-2xl
        overflow-hidden
      ">

        <div className="
          px-5
          py-4
          border-b
          border-slate-800
          text-white
          font-semibold
        ">
          Malicious Threat Feed
        </div>

        <div className="
          grid
          grid-cols-4
          px-5
          py-4
          text-xs
          uppercase
          tracking-wider
          text-slate-500
          border-b
          border-slate-800
          bg-slate-900/40
        ">

          <div>IP Address</div>
          <div>Country</div>
          <div>Threat Type</div>
          <div>Severity</div>

        </div>

        {threats.map((threat, index) => (

          <div
            key={index}
            className="
              grid
              grid-cols-4
              px-5
              py-4
              border-b
              border-slate-800
              hover:bg-slate-900/30
              transition-all
              text-sm
            "
          >

            <div className="text-white">
              {threat.ip}
            </div>

            <div className="text-slate-300">
              {threat.country}
            </div>

            <div className="text-slate-400">
              {threat.type}
            </div>

            <div>

              <span className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                ${
                  threat.severity === 'HIGH'
                    ? 'bg-red-500/10 text-red-400'
                    : 'bg-yellow-500/10 text-yellow-400'
                }
              `}>

                {threat.severity}

              </span>

            </div>

          </div>

        ))}

      </div>

      <AttackMap threats={threats} />

    </div>
  );
}

export default ThreatIntel;