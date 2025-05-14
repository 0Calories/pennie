import React, { useState } from 'react';
import PieChartCard from './charts/PieChartCard';
import BarChartCard from './charts/BarChartCard';
import LineChartCard from './charts/LineChartCard';
import Button from './Button';

// Temporary mock data - replace with real data later
const mockCategoryData = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Shopping', value: 300 },
  { name: 'Entertainment', value: 200 },
];

const mockWeeklyData = [
  { name: 'Mon', amount: 40 },
  { name: 'Tue', amount: 30 },
  { name: 'Wed', amount: 60 },
  { name: 'Thu', amount: 45 },
  { name: 'Fri', amount: 75 },
  { name: 'Sat', amount: 85 },
  { name: 'Sun', amount: 50 },
];

const Dashboard = () => {
  const [expenseInput, setExpenseInput] = useState('');

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement NLP parsing and expense addition
    console.log('Processing expense:', expenseInput);
    setExpenseInput('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PieChartCard 
          title="Category Breakdown"
          data={mockCategoryData}
        />
        <BarChartCard 
          title="Weekly Spending"
          data={mockWeeklyData}
        />
        <LineChartCard 
          title="Monthly Trend"
          data={mockWeeklyData}
        />
      </div>

      {/* Insights Feed */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Pennie Says</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-lg">🍕 You're spending 2x more on delivery this week!</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-lg">💰 Great job! You've stayed under budget in the Shopping category.</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-lg">⚡ Tip: Consider meal prepping to reduce food expenses next week.</p>
          </div>
        </div>
      </section>

      {/* Quick Add Section */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Add</h2>
          <form onSubmit={handleExpenseSubmit} className="flex gap-2">
            <input
              type="text"
              value={expenseInput}
              onChange={(e) => setExpenseInput(e.target.value)}
              placeholder="Enter expense (e.g., 'Starbucks $7 this morning')"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="primary">
              Add
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 