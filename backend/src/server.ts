import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, RequestHandler } from 'express';
import {
  ApiErrorResponseSchema,
  ApiSuccessResponseSchema,
  ParseExpenseRequestSchema,
} from './types';
import { parseExpense } from './utils/openAI';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/parse-expense', (async (req, res) => {
  try {
    const validationResult = ParseExpenseRequestSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid request format',
        details: validationResult.error.message,
      } satisfies typeof ApiErrorResponseSchema._type);
    }

    const { message } = validationResult.data;
    const parsedExpense = await parseExpense(message);

    // Validate response from OpenAI
    const responseValidation = ApiSuccessResponseSchema.safeParse({ data: parsedExpense });
    if (!responseValidation.success) {
      return res.status(500).json({
        error: 'Invalid response format from OpenAI',
        details: responseValidation.error.message,
      } satisfies typeof ApiErrorResponseSchema._type);
    }

    res.json(responseValidation.data);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({
      error: 'Failed to parse expense',
      details: error instanceof Error ? error.message : 'Unknown error',
    } satisfies typeof ApiErrorResponseSchema._type);
  }
}) as RequestHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
