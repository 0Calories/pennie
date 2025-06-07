import { useState } from 'react';

interface ExpenseInputProps {
  onSubmit: (message: string) => void;
}

export default function ExpenseInput({ onSubmit }: ExpenseInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    onSubmit(input);
    setInput('');
  };

  return (
    <div className="fixed bottom-0 left-48 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add an expense"
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
        />
      </form>
    </div>
  );
}
