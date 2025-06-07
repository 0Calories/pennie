import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = <T extends AnyZodObject>(schema: T) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validationResult = await schema.safeParseAsync(req.body);

      if (!validationResult.success) {
        res.status(400).json({
          error: 'Invalid request format',
          details: validationResult.error.message,
        });

        return;
      }

      req.validatedData = validationResult.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};

const createValidatedResponse = (res: Response, schema: AnyZodObject) => {
  return {
    json: (body: any): Response => {
      const validationResult = schema.safeParse(body);
      if (!validationResult.success) {
        return res.status(500).json({
          error: 'Invalid response format',
          details: validationResult.error.message,
        });
      }
      return res.json(validationResult.data);
    },
  };
};

// Middleware that adds the validated response to the request
export const validateResponse = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    req.validatedResponse = createValidatedResponse(res, schema);
    next();
  };
};
