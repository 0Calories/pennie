import { useState } from 'react';
import { IconButton } from './core/button/IconButton';
import { IconPlane } from './core/icons/IconPlane';
import TextInput from './core/textinput/TextInput';

interface ExpenseInputProps {
  onSubmit: (message: string) => void;
}

export default function ExpenseInput({ onSubmit }: ExpenseInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center">
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Add an expense"
          className="rounded-r-none border-r-1"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <IconButton
          icon={<IconPlane />}
          onClick={handleSubmit}
          size="lg"
          className={`h-12 w-12 p-0 border-1 rounded-l-none border-l-0 border-pennie-600 ml-[1px] ${
            isFocused ? 'ring-3 ring-pennie-600' : ''
          }`}
        />
      </form>
    </div>
  );
}
