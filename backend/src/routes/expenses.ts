import { MAX_EXPENSE_NAME_LENGTH } from '@shared/constants/constants';
import { Router } from 'express';
import { ExpenseCategory, PrismaClient } from '../generated/prisma';
import { requireAuth } from '../middleware/auth';
import { InferZodType } from '../middleware/types';
import { validateRequest, validateResponse } from '../middleware/validation';
import {
  ApiSuccessResponseSchema,
  ParseExpenseRequestSchema,
  SaveExpenseRequestSchema,
} from '../types';
import { ApiErrorResponseSchema } from '../types';
import { parseExpense } from '../utils/openAI';

const router = Router();
const prisma = new PrismaClient();

router.post(
  '/parse',
  requireAuth,
  validateRequest(ParseExpenseRequestSchema),
  validateResponse(ApiSuccessResponseSchema),
  async (req, res) => {
    try {
      const { message } = req.validatedData as InferZodType<typeof ParseExpenseRequestSchema>;
      const parsedExpense = await parseExpense(message);
      parsedExpense.category = parsedExpense.category.toUpperCase() as ExpenseCategory;
      req.validatedResponse!.json({ data: parsedExpense });
    } catch (error) {
      console.error('OpenAI API Error:', error);
      res.status(500).json({
        error: 'Failed to parse expense',
        details: error instanceof Error ? error.message : 'Unknown error',
      } satisfies typeof ApiErrorResponseSchema._type);
    }
  }
);

router.post('/save', requireAuth, validateRequest(SaveExpenseRequestSchema), async (req, res) => {
  try {
    const { expense } = req.validatedData as InferZodType<typeof SaveExpenseRequestSchema>;

    const cost = parseFloat(expense.cost.toString());
    if (isNaN(cost) || cost <= 0) {
      res.status(400).json({
        error: 'Invalid expense cost',
        details: 'Cost must be a positive number',
      } satisfies typeof ApiErrorResponseSchema._type);
      return;
    }

    if (expense.name.length > MAX_EXPENSE_NAME_LENGTH) {
      res.status(400).json({
        error: 'Invalid expense name',
        details: `Name must be ${MAX_EXPENSE_NAME_LENGTH} characters or less`,
      } satisfies typeof ApiErrorResponseSchema._type);
      return;
    }

    const category = expense.category.toUpperCase();
    if (!Object.values(ExpenseCategory).includes(category as ExpenseCategory)) {
      res.status(400).json({
        error: 'Invalid expense category',
        details: `Category must be one of: ${Object.values(ExpenseCategory).join(', ')}`,
      } satisfies typeof ApiErrorResponseSchema._type);
      return;
    }

    const savedExpense = await prisma.expense.create({
      data: {
        name: expense.name,
        cost: cost,
        category: category as ExpenseCategory,
        userId: req.userId!,
      },
    });

    res.status(201).json({ data: savedExpense });
  } catch (error) {
    console.error('Error saving expense:', error);
    res.status(500).json({
      error: 'Failed to save expense',
      details: error instanceof Error ? error.message : 'Unknown error',
    } satisfies typeof ApiErrorResponseSchema._type);
  }
});

export default router;
