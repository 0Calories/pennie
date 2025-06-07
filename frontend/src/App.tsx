import Dashboard from './components/Dashboard';
import ExpenseInput from './components/ExpenseInput';
import Navbar from './components/sidebar/Sidebar';
import { ThemeProvider } from './theme/ThemeProvider';
import './App.css';
import { useState } from 'react';
import ExpenseSubmissionModal from './components/ExpenseSubmissionModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        <Navbar />
        <main className="ml-64 min-h-screen w-auto p-8">
          <Dashboard />
        </main>

        <ExpenseInput onSubmit={() => setIsModalOpen(true)} />
        <ExpenseSubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
