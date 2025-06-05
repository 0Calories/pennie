import Dashboard from './components/Dashboard';
import ExpenseInput from './components/ExpenseInput';
import Navbar from './components/sidebar/Sidebar';
import { ThemeProvider } from './theme/ThemeProvider';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        <Navbar />
        <main className="ml-64 min-h-screen w-auto p-8">
          <Dashboard />
        </main>

        <ExpenseInput />
      </div>
    </ThemeProvider>
  );
}

export default App;
