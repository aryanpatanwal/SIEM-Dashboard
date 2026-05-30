import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function SeverityChart({ logs }) {

  const data = [
    {
      name: 'HIGH',
      value:
        logs.filter(
          (log) =>
            log.severity === 'HIGH'
        ).length
    },
    {
      name: 'MEDIUM',
      value:
        logs.filter(
          (log) =>
            log.severity === 'MEDIUM'
        ).length
    },
    {
      name: 'LOW',
      value:
        logs.filter(
          (log) =>
            log.severity === 'LOW'
        ).length
    }
  ];

  const COLORS = [
    '#ef4444',
    '#f59e0b',
    '#22c55e'
  ];

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
          Threat Severity
        </h2>

        <div className="
          text-xs
          text-slate-500
        ">
          Live Distribution
        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default SeverityChart;