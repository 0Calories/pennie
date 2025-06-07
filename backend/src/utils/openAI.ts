import { OpenAI } from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { ExpenseSchema } from '../types';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Maximum length for expense messages to prevent abuse
const MAX_MESSAGE_LENGTH = 100;

const expenseSystemPrompt = `
    You are an assistant for an expense tracking application. 
    When given a message describing an expense, extract the cost, name of the expense, and categorize the expense. 
    If cost or name is missing, return an error. 
    Example: '$5 coffee' will return cost $5, name: 'Coffee", and category: 'Coffee'.
    Use proper capitalization for the name.
    Category should be returned in all caps.
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

/**
 * Validates and sanitizes the input message
 */
const validateMessage = (message: string): string => {
  if (!message || typeof message !== 'string') {
    throw new Error('Invalid message: Message must be a non-empty string');
  }

  const sanitized = message.trim();
  if (sanitized.length === 0) {
    throw new Error('Invalid message: Message cannot be empty');
  }

  if (sanitized.length > MAX_MESSAGE_LENGTH) {
    throw new Error(
      `Invalid message: Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`
    );
  }

  // Basic sanitization to prevent prompt injection
  // Remove any potential prompt injection patterns
  return sanitized.replace(/[<>{}[\]]/g, '');
};

export const parseExpense = async (message: string) => {
  try {
    const sanitizedMessage = validateMessage(message);

    const response = await openai.responses.parse({
      model: 'o4-mini',
      input: [
        {
          role: 'system',
          content: expenseSystemPrompt,
        },
        { role: 'user', content: sanitizedMessage },
      ],
      text: {
        format: zodTextFormat(ExpenseSchema, 'expense_schema'),
      },
    });

    if (!response.output_parsed) {
      throw new Error('Failed to parse expense data');
    }

    return response.output_parsed;
  } catch (error) {
    // Log the error for monitoring
    console.error('Error parsing expense:', error);

    // Rethrow with a user-friendly message
    if (error instanceof Error) {
      throw new Error(`Failed to process expense: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while processing the expense');
  }
};
