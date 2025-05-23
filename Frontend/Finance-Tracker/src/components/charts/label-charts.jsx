import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Labelcharts = ({ data }) => {
  const { labels, datasets } = data;

  // Transform labels and datasets into Recharts-friendly data array
  const chartData = labels.map((label, idx) => {
    const point = { name: label };
    datasets.forEach((ds) => {
      point[ds.label] = ds.data[idx] ?? 0;
    });
    return point;
  });

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {datasets.map((ds) => (
              <linearGradient
                key={ds.label}
                id={`color${ds.label.replace(/\s+/g, "")}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={ds.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={ds.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            tick={{ fontSize: 12 }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={(value) => [`$${value}`, ""]} />
          <Legend />

          {datasets.map((ds) => (
            <Area
              key={ds.label}
              type="monotone"
              dataKey={ds.label}
              stroke={ds.color}
              fillOpacity={1}
              fill={`url(#color${ds.label.replace(/\s+/g, "")})`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Labelcharts;
