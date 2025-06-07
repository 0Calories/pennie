import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  ParseExpenseRequest,
  ParsedExpense,
} from '@shared/types/api';
import { useState } from 'react';
import { API_ENDPOINTS } from '../config/api';

interface ExpenseInputProps {
  onSubmit: () => void;
}

export default function ExpenseInput({ onSubmit }: ExpenseInputProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    onSubmit();
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.parseExpense, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ message: input } satisfies ParseExpenseRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ApiErrorResponse;
        console.error('Error parsing expense:', errorData.error, errorData.details);
        setError(errorData.error);
        return;
      }

      const successData = data as ApiSuccessResponse<ParsedExpense>;
      console.log('Parsed expense:', successData.data);
    } catch (error) {
      console.error('Failed to parse expense:', error);
      setError('Failed to parse expense. Please try again');
    } finally {
      setIsLoading(false);
      setInput('');
      setError(null);
    }
  };

  return (
    <div className="fixed bottom-0 left-64 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add an expense"
          disabled={isLoading}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
}
