import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShieldAlert,
  BarChart3,
  Globe
} from 'lucide-react';

function Sidebar({
  activePage,
  setActivePage,
  sidebarOpen
}) {

  const menuItems = [
    {
      name: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      name: 'alerts',
      label: 'Alerts',
      icon: <ShieldAlert size={20} />
    },
    {
      name: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 size={20} />
    },
    {
      name: 'threat intel',
      label: 'Threat Intel',
      icon: <Globe size={20} />
    }
  ];

  return (

    <div className={`
  ${
    sidebarOpen
      ? 'w-[260px]'
      : 'w-[90px]'
  }

  bg-[#0f172a]
  border-r
  border-slate-800
  flex
  flex-col
  justify-between
  px-4
  py-6
  transition-all
  duration-300
`}>

      <div>

        <div className="
          flex
          items-center
          gap-3
          mb-10
          px-3
        ">

          <div className="
            w-3
            h-3
            rounded-full
            bg-red-500
            animate-pulse
          " />

          {sidebarOpen && (
  <h1 className="
    text-xl
    font-bold
    tracking-wide
    text-white
  ">
    SIEM Console
  </h1>
)}

        </div>

        <div className="space-y-2">

          {menuItems.map((item) => (

            <motion.button
              key={item.name}
              whileHover={{
  x: 6
}}

transition={{
  duration: 0.2
}}
              onClick={() =>
                setActivePage(item.name)
              }
              className={`
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                duration-200
                text-sm
                font-medium

                ${
                  activePage === item.name
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }
              `}
            >

              {item.icon}

              {sidebarOpen && item.label}

            </motion.button>

          ))}

        </div>

      </div>

      <div className="
        text-xs
        text-slate-500
        px-3
      ">
        SIEM v1.0
      </div>

    </div>
  );
}

export default Sidebar;