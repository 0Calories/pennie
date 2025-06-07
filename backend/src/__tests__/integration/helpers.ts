import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '../../generated/prisma';

const prisma = new PrismaClient();

export const createTestUser = async (): Promise<User> => {
  return prisma.user.create({
    data: {
      email: `test-${Date.now()}@example.com`,
      password: 'hashed_password', // In a real test, this would be properly hashed
    },
  });
};

export const getAuthToken = (user: User): string => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'test-secret');
};
