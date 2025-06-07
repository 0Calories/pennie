import { SaveExpenseRequest } from '@shared/types/api';
import { ExpenseCategory, getExpenseCategoryDisplayName } from '@shared/types/expense';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../config/api';
import Button from './Button';
import Modal from './Modal';
import Spinner from './Spinner';

interface ExpenseSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExpense?: {
    name: string;
    cost: number;
    category: ExpenseCategory;
  };
  isLoading?: boolean;
}

export default function ExpenseSubmissionModal({
  isOpen,
  onClose,
  initialExpense,
  isLoading = false,
}: ExpenseSubmissionModalProps) {
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.OTHER);

  useEffect(() => {
    if (initialExpense) {
      setName(initialExpense.name);
      setCost(initialExpense.cost);
      setCategory(initialExpense.category);
    } else {
      setName('');
      setCost(0);
      setCategory(ExpenseCategory.OTHER);
    }
  }, [initialExpense, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !cost || !category) {
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.saveExpense, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          expense: {
            name,
            cost,
            category,
          },
        } satisfies SaveExpenseRequest),
      });

      const data = await response.json();
      console.dir(data);
    } catch (error) {
      console.error('Error saving expense:', error);
    }

    setName('');
    setCost(0);
    setCategory(ExpenseCategory.OTHER);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Expense">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Expense Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pennie-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Spinner size="sm" />
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="cost"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Cost
          </label>
          <input
            type="number"
            id="cost"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            required
            min="0"
            step="0.01"
            disabled={isLoading}
            className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pennie-500 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="0.00"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            required
            disabled={isLoading}
            className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pennie-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {Object.values(ExpenseCategory).map((c) => (
              <option key={c} value={c}>
                {getExpenseCategoryDisplayName(c)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center space-x-3 mt-20">
          <Button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" className="mx-2" /> : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
