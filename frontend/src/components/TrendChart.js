import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function TrendChart({ logs }) {

  const recentLogs =
    logs.slice(0, 10).reverse();

  const data = recentLogs.map(
    (log, index) => ({
      time: log.timestamp,
      alerts: index + 1
    })
  );

  return (

    <div className="
      bg-[#111827]
      border
      border-slate-800
      rounded-2xl
      p-5
      h-[320px]
    ">

      <div className="
        flex
        items-center
        justify-between
        mb-4
      ">

        <h2 className="
          text-white
          text-lg
          font-semibold
        ">
          Attack Trend
        </h2>

        <div className="
          text-xs
          text-slate-500
        ">
          Last 10 Events
        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <XAxis
            dataKey="time"
            stroke="#64748b"
            fontSize={12}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="alerts"
            stroke="#ef4444"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TrendChart;