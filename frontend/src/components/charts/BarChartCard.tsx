import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface DataItem {
  name: string;
  amount: number;
}

interface BarChartCardProps {
  title: string;
  data: DataItem[];
  color?: string;
}

const BarChartCard: React.FC<BarChartCardProps> = ({ 
  title, 
  data, 
  color = '#8884d8' 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <BarChart width={300} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill={color} />
      </BarChart>
    </div>
  );
};

export default BarChartCard; 