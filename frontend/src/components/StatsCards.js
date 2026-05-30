import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Activity,
  Globe,
  ServerCrash
} from 'lucide-react';

function StatsCards({ logs }) {

  const highAlerts =
    logs.filter(
      (log) => log.severity === 'HIGH'
    ).length;

  const totalLogs = logs.length;

  const suspiciousIPs =
    new Set(logs.map((log) => log.ip)).size;

  const failedLogins =
    logs.filter(
      (log) =>
        log.event === 'Authentication Failure'
    ).length;

  const cards = [
    {
      title: 'Critical Alerts',
      value: highAlerts,
      icon: <ShieldAlert size={22} />,
      color: 'from-red-500 to-red-700'
    },
    {
      title: 'Total Events',
      value: totalLogs,
      icon: <Activity size={22} />,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Suspicious IPs',
      value: suspiciousIPs,
      icon: <Globe size={22} />,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'Failed Logins',
      value: failedLogins,
      icon: <ServerCrash size={22} />,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (

    <div className="
      grid
      grid-cols-1 md:grid-cols-2 xl:grid-cols-4
      gap-5
      mt-6
    ">

      {cards.map((card, index) => (

        <motion.div
          key={index}
          whileHover={{
  scale: 1.03,
  y: -4
}}

transition={{
  duration: 0.2
}}
          className="
            bg-[#111827]
            border
            border-slate-800
            rounded-2xl
            p-5
            hover:border-slate-700
            transition-all
            duration-300
            hover:-translate-y-1
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
              shadow-lg
            `}>

              {card.icon}

            </div>

          </div>

        </motion.div>

      ))}

    </div>
  );
}

export default StatsCards;