import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface DataItem {
  name: string;
  value: number;
}

interface PieChartCardProps {
  title: string;
  data: DataItem[];
  colors?: string[];
}

const DEFAULT_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartCard = ({ title, data, colors = DEFAULT_COLORS }: PieChartCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx={150}
          cy={150}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieChartCard;
