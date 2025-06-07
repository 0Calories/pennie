import { ExpenseCategory, getExpenseCategoryDisplayName } from '@shared/types/expense';
import { useState } from 'react';
import Button from './Button';

interface ExpenseSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (expense: {
    name: string;
    cost: number;
    category: ExpenseCategory;
  }) => void;
}

export default function ExpenseSubmissionModal({
  isOpen,
  onClose,
  onSubmit,
}: ExpenseSubmissionModalProps) {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.OTHER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      name,
      cost: parseFloat(cost),
      category,
    });

    setName('');
    setCost('');
    setCategory(ExpenseCategory.OTHER);

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
            Add New Expense
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Expense Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pennie-500"
              />
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
                onChange={(e) => setCost(e.target.value)}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pennie-500"
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
                className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pennie-500"
              >
                {Object.values(ExpenseCategory).map((c) => (
                  <option key={c} value={c}>
                    {getExpenseCategoryDisplayName(c)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                type="button"
                onClick={onClose}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100"
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
