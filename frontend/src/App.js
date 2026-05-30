import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import LogCard from './components/LogCard';
import StatsCards from './components/StatsCards';
import AlertBanner from './components/AlertBanner';
import SeverityChart from './components/SeverityChart';
import TrendChart from './components/TrendChart';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import TopBar from './components/TopBar';
import ThreatIntel from './components/ThreatIntel';
import Analytics from './components/Analytics';
import Alerts from './components/Alerts';
import Register from './components/Register';

function App() {

  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [activeAlert, setActiveAlert] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const [activePage, setActivePage] =
    useState('dashboard');

  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLogs([]);
      return;
    }

    const fetchLogs = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/logs`,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (!res.ok) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          throw new Error('Unauthorized');
        }

        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setLogs([]);
      }
    };

    fetchLogs();

    const socket = io(
  process.env.REACT_APP_API_URL,
  {
    auth: {
      token: localStorage.getItem('token')
    }
  }
);
    socket.on('newLog', (log) => {
      setLogs((prevLogs) => [log, ...prevLogs]);

      if (
        log.event &&
        log.event.includes('BRUTE FORCE')
      ) {
        setActiveAlert(log);
        setTimeout(() => {
          setActiveAlert(null);
        }, 10000);
      }
    });

    return () => {
      socket.off('newLog');
      socket.disconnect();
    };
  }, [isAuthenticated]);
  const [sidebarOpen, setSidebarOpen] =
  useState(true);
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.event
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      log.user
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm);

    const matchesSeverity =
      severityFilter === 'ALL' ||
      log.severity === severityFilter;

    return (
      matchesSearch &&
      matchesSeverity
    );

  });

  if (!isAuthenticated) {
    return showRegister ? (
      <Register
        setShowRegister={setShowRegister}
      />
    ) : (
      <Login
        setIsAuthenticated={setIsAuthenticated}
        setShowRegister={setShowRegister}
      />
    );
  }

  return (

    <div className="
      flex
      bg-[#0b1220]
      text-white
      min-h-screen
    ">

      <Sidebar
  activePage={activePage}
  setActivePage={setActivePage}
  sidebarOpen={sidebarOpen}
/>

      <div className="
        flex-1
        p-6
        overflow-y-auto
      ">

        {activePage === 'dashboard' && (

          <>

            <TopBar
  setIsAuthenticated={
    setIsAuthenticated
  }

  sidebarOpen={sidebarOpen}

  setSidebarOpen={
    setSidebarOpen
  }
/>

            <AlertBanner
              alert={activeAlert}
            />

            <StatsCards logs={logs} />

            <div className="
              grid
              grid-cols-1 xl:grid-cols-3
              gap-5
              mt-6
            ">

              <div className="col-span-1">
                <SeverityChart logs={logs} />
              </div>

              <div className="col-span-2">
                <TrendChart logs={logs} />
              </div>

            </div>

            <div className="
              flex
              items-center
              gap-4
              mt-6
              mb-6
            ">

              <div className="
                flex-1
                relative
              ">

                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    bg-[#111827]
                    border
                    border-slate-800
                    rounded-xl
                    px-5
                    py-3
                    text-white
                    placeholder:text-slate-500
                    focus:outline-none
                    focus:border-red-500/40
                  "
                />

              </div>

              <select
                value={severityFilter}
                onChange={(e) =>
                  setSeverityFilter(
                    e.target.value
                  )
                }
                className="
                  bg-[#111827]
                  border
                  border-slate-800
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  focus:outline-none
                  focus:border-red-500/40
                "
              >

                <option value="ALL">
                  All Severities
                </option>

                <option value="HIGH">
                  HIGH
                </option>

                <option value="MEDIUM">
                  MEDIUM
                </option>

                <option value="LOW">
                  LOW
                </option>

              </select>

            </div>

            <div className="
              mt-6
              bg-[#111827]
              border
              border-slate-800
              rounded-2xl
              overflow-hidden
              overflow-x-auto
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
                  Live Security Logs
                </h2>

              </div>

              <div className="
                grid
                grid-cols-5
                gap-4
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

                <div>Event</div>
                <div>User</div>
                <div>IP Address</div>
                <div>Severity</div>
                <div>Timestamp</div>

              </div>

              {filteredLogs.length === 0 ? (

  <div className="
    py-16
    text-center
    text-slate-500
  ">

    No security events detected

  </div>

) : (

  filteredLogs.map((log) => (

    <LogCard
      key={log._id}
      log={log}
    />

  ))

)}

            </div>

          </>

        )}

        {activePage === 'threat intel' && (
          <ThreatIntel />
        )}
        {activePage === 'analytics' && (
  <Analytics logs={logs} />
)}
{activePage === 'alerts' && (
  <Alerts logs={logs} />
)}


      </div>

    </div>

  );
}

export default App;