import { AnyZodObject } from 'zod';

// Make the request type generic based on the schema
declare global {
  namespace Express {
    interface Request {
      validatedData?: unknown;
      validatedResponse?: {
        json: (body: any) => Response;
      };
    }
  }
}

// Helper type to extract the type from a Zod schema
export type InferZodType<T extends AnyZodObject> = T['_type'];
