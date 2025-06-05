import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, RequestHandler } from 'express';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/parse-expense', (async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Please provide a text string to parse' });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: '',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      model: 'gpt-4.1-mini',
      response_format: { type: 'json_object' },
    });

    res.json(completion.choices[0].message);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({
      error: 'Failed to parse expense',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}) as RequestHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
