import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, RequestHandler } from 'express';
import { InferZodType } from './middleware/types';
import { validateRequest, validateResponse } from './middleware/validation';
import {
  ApiErrorResponseSchema,
  ApiSuccessResponseSchema,
  ParseExpenseRequestSchema,
} from './types';
import { parseExpense } from './utils/openAI';
import './middleware/types';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post(
  '/api/parse-expense',
  validateRequest(ParseExpenseRequestSchema),
  validateResponse(ApiSuccessResponseSchema),
  (async (req, res) => {
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
  }) as RequestHandler
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
