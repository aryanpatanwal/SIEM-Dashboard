import {
  Bell,
  Moon,
  Shield,
  RefreshCw
} from 'lucide-react';

function Settings() {

  const settings = [
    {
      icon: <Bell size={20} />,
      title: 'Notifications',
      description:
        'Enable real-time threat alerts'
    },
    {
      icon: <Moon size={20} />,
      title: 'Dark Mode',
      description:
        'System-wide dashboard appearance'
    },
    {
      icon: <Shield size={20} />,
      title: 'Threat Protection',
      description:
        'Advanced security monitoring'
    },
    {
      icon: <RefreshCw size={20} />,
      title: 'Auto Refresh',
      description:
        'Refresh logs every 3 seconds'
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
          Settings
        </h1>

        <p className="
          text-slate-400
          mt-2
        ">
          Dashboard preferences &
          system configuration
        </p>

      </div>

      <div className="
        bg-[#111827]
        border
        border-slate-800
        rounded-2xl
        overflow-hidden
      ">

        {settings.map((setting, index) => (

          <div
            key={index}
            className="
              flex
              items-center
              justify-between
              px-6
              py-5
              border-b
              border-slate-800
              hover:bg-slate-900/40
              transition-all
            "
          >

            <div className="
              flex
              items-center
              gap-4
            ">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-slate-900
                border
                border-slate-800
                flex
                items-center
                justify-center
                text-slate-300
              ">

                {setting.icon}

              </div>

              <div>

                <h2 className="
                  text-white
                  font-semibold
                ">
                  {setting.title}
                </h2>

                <p className="
                  text-slate-400
                  text-sm
                  mt-1
                ">
                  {setting.description}
                </p>

              </div>

            </div>

            <button className="
              px-4
              py-2
              rounded-xl
              bg-red-500/10
              border
              border-red-500/20
              text-red-400
              text-sm
              font-semibold
              hover:bg-red-500/20
              transition-all
            ">

              Enabled

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Settings;