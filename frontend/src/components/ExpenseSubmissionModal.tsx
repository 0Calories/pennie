import { ExpenseCategory, getExpenseCategoryDisplayName } from '@shared/types/expense';
import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';

export default function ExpenseSubmissionModal() {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.OTHER);
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Submit expense to backend

    setName('');
    setCost('');
    setCategory(ExpenseCategory.OTHER);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Expense">
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

        <div className="flex justify-center space-x-3 mt-20">
          <Button
            type="button"
            onClick={() => {}}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100"
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}
