import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import {
  Bell,
  Search,
  Menu
} from 'lucide-react';

function TopBar({
  setIsAuthenticated,
  setSidebarOpen,
  sidebarOpen
}) {

  const handleLogout = () => {

    localStorage.removeItem('token');

    setIsAuthenticated(false);
  };
  const exportCSV = () => {

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
    .then((logs) => {

  if (!Array.isArray(logs)) {

    alert('Unable to fetch logs');

    return;

  }

      const headers =
        'Event,User,IP,Severity,Timestamp\n';

      const rows = logs.map((log) => (

        `${log.event},${log.user},${log.ip},${log.severity},${log.timestamp}`

      )).join('\n');

      const csv =
        headers + rows;

      const blob = new Blob(
        [csv],
        {
          type: 'text/csv;charset=utf-8'
        }
      );

      saveAs(
        blob,
        'siem-logs.csv'
      );

    });

};
const exportPDF = () => {

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
    .then((logs) => {

  if (!Array.isArray(logs)) {

    alert('Unable to fetch logs');

    return;

  }

      const doc = new jsPDF();

      doc.setFontSize(20);

      doc.text(
        'SIEM Security Report',
        20,
        20
      );

      doc.setFontSize(12);

      let y = 40;

      logs.slice(0, 20).forEach((log) => {

        doc.text(
          `Event: ${log.event}`,
          20,
          y
        );

        doc.text(
          `User: ${log.user}`,
          20,
          y + 7
        );

        doc.text(
          `IP: ${log.ip}`,
          20,
          y + 14
        );

        doc.text(
          `Severity: ${log.severity}`,
          20,
          y + 21
        );

        y += 35;

        if (y > 260) {

          doc.addPage();

          y = 20;

        }

      });

      doc.save(
        'siem-security-report.pdf'
      );

    });

};

  return (

    <div className="
      flex
      items-center
      justify-between
      mb-6
    ">

      <div className="
  flex
  items-center
  gap-4
">

  <button
    onClick={() =>
      setSidebarOpen(!sidebarOpen)
    }
    className="
      w-11
      h-11
      rounded-xl
      bg-[#111827]
      border
      border-slate-800
      flex
      items-center
      justify-center
      text-slate-400
      hover:text-white
      hover:border-slate-600
      transition-all
    "
  >

    <Menu size={20} />

  </button>

  <div>

    <h1 className="
          text-3xl
          font-bold
          text-white
        ">
          Security Dashboard
        </h1>

        <p className="
          text-slate-400
          mt-1
          text-sm
        ">
          Real-time threat monitoring & analytics
        </p>
        </div>

      </div>

      <div className="
        flex
        items-center
        gap-4
      ">

        <div className="
          relative
        ">

          <Search
            size={18}
            className="
              absolute
              left-3
              top-3
              text-slate-500
            "
          />

          <input
            placeholder="Search..."
            className="
              bg-[#111827]
              border
              border-slate-800
              rounded-xl
              pl-10
              pr-4
              py-2.5
              text-sm
              text-white
              outline-none
              w-[240px]
              focus:border-red-500
              transition-all
            "
          />

        </div>

        <button className="
          w-11
          h-11
          rounded-xl
          bg-[#111827]
          border
          border-slate-800
          flex
          items-center
          justify-center
          text-slate-400
          hover:text-white
          hover:border-slate-600
          transition-all
        ">

          <Bell size={18} />

        </button>
        <button
  onClick={exportCSV}
  className="
    bg-[#111827]
    border
    border-slate-800
    hover:border-slate-600
    transition-all
    text-white
    px-5
    py-2.5
    rounded-xl
    text-sm
    font-semibold
  "
>
  Export CSV
</button>
<button
  onClick={exportPDF}
  className="
    bg-[#111827]
    border
    border-slate-800
    hover:border-slate-600
    transition-all
    text-white
    px-5
    py-2.5
    rounded-xl
    text-sm
    font-semibold
  "
>
  Export PDF
</button>
        <button
          onClick={handleLogout}
          className="
            bg-red-500
            hover:bg-red-600
            transition-all
            text-white
            px-5
            py-2.5
            rounded-xl
            text-sm
            font-semibold
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default TopBar;