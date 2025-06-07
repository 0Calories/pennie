import { faker } from '@faker-js/faker';
import request from 'supertest';
import app from '../../server';
import { prisma } from '../setup';

describe('Authentication Integration Tests', () => {
  const testUser = {
    email: faker.internet.email(),
    password: 'TestPassword123!',
  };

  describe('POST /api/users/register', () => {
    it('should successfully register a new user', async () => {
      const response = await request(app).post('/api/users/register').send(testUser);

      expect(response.status).toBe(201);
      expect(response.body.data.message).toBe('User registered successfully');

      const user = await prisma.user.findUnique({
        where: { email: testUser.email },
      });
      expect(user).toBeTruthy();
      expect(user?.email).toBe(testUser.email);
    });

    it('should fail to register with existing email', async () => {
      await request(app).post('/api/users/register').send(testUser);

      // Attempt to register again with same email
      const response = await request(app).post('/api/users/register').send(testUser);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email already in use');
    });

    it('should fail to register with invalid email', async () => {
      const response = await request(app).post('/api/users/register').send({
        email: 'invalid-email',
        password: testUser.password,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid request format');
    });

    it('should fail to register with short password', async () => {
      const response = await request(app).post('/api/users/register').send({
        email: testUser.email,
        password: 'short',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid request format');
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      // Register a user before each login test
      await request(app).post('/api/users/register').send(testUser);
    });

    it('should successfully login with valid credentials', async () => {
      const response = await request(app).post('/api/users/login').send(testUser);

      expect(response.status).toBe(200);
      expect(response.body.data.message).toBe('Login successful');
      expect(response.body.data.token).toBeTruthy();
    });

    it('should fail to login with incorrect password', async () => {
      const response = await request(app).post('/api/users/login').send({
        email: testUser.email,
        password: 'WrongPassword123!',
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid credentials');
    });

    it('should fail to login with non-existent email', async () => {
      const response = await request(app).post('/api/users/login').send({
        email: faker.internet.email(),
        password: testUser.password,
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid credentials');
    });
  });
});
