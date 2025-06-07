import request from 'supertest';
import app from '../../server';
import { Expense } from '../../types';
import { parseExpense } from '../../utils/openAI';
import { prisma } from '../setup';
import { createTestUser, getAuthToken } from './helpers';

interface SavedExpense extends Expense {
  id: string;
  userId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

describe('Expense Integration Tests', () => {
  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    const user = await createTestUser();
    userId = user.id;
    authToken = getAuthToken(user);
  });

  describe('POST /api/expenses/parse', () => {
    const sampleExpenseResponse = {
      name: 'Coffee',
      cost: 5,
      category: 'COFFEE',
    };

    beforeEach(() => {
      jest.clearAllMocks();
      (parseExpense as jest.Mock).mockResolvedValue(sampleExpenseResponse);
    });

    it('should successfully parse a valid expense message', async () => {
      const response = await request(app)
        .post('/api/expenses/parse')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ message: '$50 italian dinner' });

      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject(sampleExpenseResponse);
    });

    it('should handle invalid expense messages', async () => {
      const response = await request(app)
        .post('/api/expenses/parse')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ message: '' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid request format');
    });
  });

  describe('POST /api/expenses/save', () => {
    it('should successfully save a valid expense', async () => {
      const sampleExpenseEntry: Expense = {
        name: 'Test Expense',
        cost: 10.5,
        category: 'FOOD',
      };

      const response = await request(app)
        .post('/api/expenses/save')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ expense: sampleExpenseEntry });

      expect(response.status).toBe(201);
      const savedExpense = response.body.data as SavedExpense;
      expect(savedExpense).toMatchObject({
        name: sampleExpenseEntry.name,
        cost: sampleExpenseEntry.cost,
        category: sampleExpenseEntry.category,
        userId,
      });

      // Verify the expense was actually saved in the database
      const dbExpense = await prisma.expense.findUnique({
        where: { id: savedExpense.id },
      });
      expect(dbExpense).toMatchObject({
        name: sampleExpenseEntry.name,
        cost: sampleExpenseEntry.cost,
        category: sampleExpenseEntry.category,
        userId,
      });
    });

    it('should reject invalid expense data', async () => {
      const invalidExpense = {
        name: 'Test Expense',
        cost: -10,
        category: 'FOOD',
      };

      const response = await request(app)
        .post('/api/expenses/save')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ expense: invalidExpense });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid expense cost');
    });

    it('should reject expenses with invalid categories', async () => {
      const invalidExpense = {
        name: 'Test Expense',
        cost: 10,
        category: 'INVALID_CATEGORY',
      };

      const response = await request(app)
        .post('/api/expenses/save')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ expense: invalidExpense });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid expense category');
    });
  });
});
