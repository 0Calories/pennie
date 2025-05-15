import Dashboard from './components/Dashboard';
import Navbar from './components/navbar/Navbar';
import { ThemeProvider } from './components/theme/ThemeProvider';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors">
        <Navbar />
        <main className="ml-64 min-h-screen w-auto p-8">
          <Dashboard />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
