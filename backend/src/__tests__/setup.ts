import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

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

// Export prisma instance for use in tests
export { prisma };
