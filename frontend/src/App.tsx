import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  ParseExpenseRequest,
  ParsedExpense,
} from '@shared/types/api';
import { ExpenseCategory } from '@shared/types/expense';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ExpenseInput from './components/ExpenseInput';
import ExpenseSubmissionModal from './components/ExpenseSubmissionModal';
import Navbar from './components/sidebar/Sidebar';
import { API_ENDPOINTS } from './config/api';
import { ThemeProvider } from './theme/ThemeProvider';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedExpense, setParsedExpense] = useState<{
    name: string;
    cost: number;
    category: ExpenseCategory;
  } | null>(null);

  const handleExpenseSubmit = async (message: string) => {
    setParsedExpense(null);
    setIsModalOpen(true);
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.parseExpense, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ message } satisfies ParseExpenseRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ApiErrorResponse;
        console.error('Error parsing expense:', errorData.error, errorData.details);
        return;
      }

      const successData = data as ApiSuccessResponse<ParsedExpense>;
      setParsedExpense({
        name: successData.data.name,
        cost: Number(successData.data.cost),
        category: successData.data.category as ExpenseCategory,
      });
    } catch (error) {
      console.error('Failed to parse expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        <Navbar />
        <main className="min-h-screen w-auto p-8">
          <Dashboard />
        </main>

        <ExpenseInput onSubmit={handleExpenseSubmit} />
        <ExpenseSubmissionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setParsedExpense(null);
          }}
          initialExpense={parsedExpense ?? undefined}
          isLoading={isLoading}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
