import { OpenAI } from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { ExpenseSchema } from '../types';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const expenseSystemPrompt = `
    You are an assistant for an expense tracking application. 
    When given a message describing an expense, extract the cost, name of the expense, and categorize the expense. 
    If cost or name is missing, return an error. 
    Example: '$5 coffee' will return cost $5, name: 'Coffee", and category: 'Coffee'.
    Use proper capitalization for the name and category.
    Some identifiers for categories are:

    - Food
    - Groceries
    - Restaurants
    - Drinks
    - Alcohol
    - Coffee
    - Tea
    - Snacks
    - Transportation
    - Housing
    - Utilities
    - Entertainment
    - Shopping
    - Subscription
    - Health
    - Gifts
    - Education
    - Travel
    - Other

    If an expense does not fit into any of the categories, infer the category based on the name of the expense.
    If the expense does not fit into any of the categories and you cannot confidently infer the category, return 'Other'.
`;

export const parseExpense = async (message: string) => {
  const response = await openai.responses.parse({
    model: 'gpt-4o-mini',
    input: [
      {
        role: 'system',
        content: expenseSystemPrompt,
      },
      { role: 'user', content: message },
    ],
    text: {
      format: zodTextFormat(ExpenseSchema, 'expense_schema'),
    },
  });

  return response.output_parsed;
};
