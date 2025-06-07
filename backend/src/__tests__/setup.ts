import { PrismaClient } from '../generated/prisma';

// Mock OpenAI module globally
jest.mock('../utils/openAI', () => ({
  parseExpense: jest.fn(),
}));

// Create a single PrismaClient instance for all tests
export const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  const tables = ['User', 'Expense'];
  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});
