import Dashboard from './components/Dashboard';
import Navbar from './components/navbar/Navbar';
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
      </div>
    </ThemeProvider>
  );
}

export default App;
