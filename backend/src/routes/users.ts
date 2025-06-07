import argon2 from 'argon2';
import { Router } from 'express';
import { z } from 'zod';
import { PrismaClient } from '../generated/prisma';
import { InferZodType } from '../middleware/types';
import { validateRequest } from '../middleware/validation';
import { ApiErrorResponseSchema, UserCredentialsSchema } from '../types';

const router = Router();
const prisma = new PrismaClient();

const PEPPER = process.env.PASSWORD_PEPPER;
if (!PEPPER) {
  console.warn(
    'Warning: PASSWORD_PEPPER environment variable not set. Consider setting it for additional security.'
  );
}

router.post('/register', validateRequest(UserCredentialsSchema), async (req, res) => {
  try {
    const registrationData = req.validatedData as InferZodType<typeof UserCredentialsSchema>;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: registrationData.email,
      },
    });

    if (existingUser) {
      res.status(400).json({
        error: 'Email already in use',
        details: 'The provided email is already registered',
      } satisfies typeof ApiErrorResponseSchema._type);
      return;
    }

    const passwordWithPepper = PEPPER
      ? `${registrationData.password}${PEPPER}`
      : registrationData.password;
    const hashedPassword = await argon2.hash(passwordWithPepper);

    await prisma.user.create({
      data: {
        email: registrationData.email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ data: { message: 'User registered successfully' } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Failed to register user',
      details: error instanceof Error ? error.message : 'Unknown error',
    } satisfies typeof ApiErrorResponseSchema._type);
  }
});

router.post('/login', validateRequest(UserCredentialsSchema), async (req, res) => {
  try {
    const loginData = req.validatedData as InferZodType<typeof UserCredentialsSchema>;

    const user = await prisma.user.findUnique({
      where: {
        email: loginData.email,
      },
    });

    if (!user) {
      res.status(401).json({
        error: 'Invalid credentials',
        details: 'Email or password is incorrect',
      } satisfies typeof ApiErrorResponseSchema._type);
      return;
    }

    const passwordWithPepper = PEPPER ? `${loginData.password}${PEPPER}` : loginData.password;

    const isValidPassword = await argon2.verify(user.password, passwordWithPepper);

    if (!isValidPassword) {
      res.status(401).json({
        error: 'Invalid credentials',
        details: 'Email or password is incorrect',
      } satisfies typeof ApiErrorResponseSchema._type);
      return;
    }

    res.status(200).json({ data: { message: 'Login successful' } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Failed to login',
      details: error instanceof Error ? error.message : 'Unknown error',
    } satisfies typeof ApiErrorResponseSchema._type);
  }
});

export default router;
