import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { IconButton } from './core/button/IconButton';
import TextInput from './core/textinput/TextInput';

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
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center gap-2">
        <TextInput value={input} onChange={setInput} placeholder="Add an expense" />
        <IconButton icon={<PaperPlaneIcon />} onClick={handleSubmit} />
      </form>
    </div>
  );
}
