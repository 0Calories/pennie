import { AnyZodObject } from 'zod';

declare global {
  namespace Express {
    interface Request {
      validatedData?: unknown;
      validatedResponse?: {
        json: (body: any) => Response;
      };
      userId?: string;
    }
  }
}

// Helper type to extract the type from a Zod schema
export type InferZodType<T extends AnyZodObject> = T['_type'];
