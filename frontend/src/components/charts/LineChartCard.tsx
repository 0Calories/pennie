import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

interface DataItem {
  name: string;
  amount: number;
}

interface LineChartCardProps {
  title: string;
  data: DataItem[];
  color?: string;
}

const LineChartCard = ({ title, data, color = '#8884d8' }: LineChartCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <LineChart width={300} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke={color} />
      </LineChart>
    </div>
  );
};

export default LineChartCard;
