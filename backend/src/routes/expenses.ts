import { Router } from 'express';
import { InferZodType } from '../middleware/types';
import { validateRequest, validateResponse } from '../middleware/validation';
import { ApiSuccessResponseSchema, ParseExpenseRequestSchema } from '../types';
import { ApiErrorResponseSchema } from '../types';
import { parseExpense } from '../utils/openAI';

const router = Router();

router.post(
  '/parse-expense',
  validateRequest(ParseExpenseRequestSchema),
  validateResponse(ApiSuccessResponseSchema),
  async (req, res) => {
    try {
      const { message } = req.validatedData as InferZodType<typeof ParseExpenseRequestSchema>;
      const parsedExpense = await parseExpense(message);
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

export default router;
