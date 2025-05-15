import PieChartCard from "./charts/PieChartCard";
import BarChartCard from "./charts/BarChartCard";
import LineChartCard from "./charts/LineChartCard";

// Temporary mock data - replace with real data later
const mockCategoryData = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Shopping", value: 300 },
  { name: "Entertainment", value: 200 },
];

const mockWeeklyData = [
  { name: "Mon", amount: 40 },
  { name: "Tue", amount: 30 },
  { name: "Wed", amount: 60 },
  { name: "Thu", amount: 45 },
  { name: "Fri", amount: 75 },
  { name: "Sat", amount: 85 },
  { name: "Sun", amount: 50 },
];

const Dashboard = () => {
  return (
    <div className="w-full">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PieChartCard title="Category Breakdown" data={mockCategoryData} />
        <BarChartCard title="Weekly Spending" data={mockWeeklyData} />
        <LineChartCard title="Monthly Trend" data={mockWeeklyData} />
      </div>
    </div>
  );
};

export default Dashboard;
