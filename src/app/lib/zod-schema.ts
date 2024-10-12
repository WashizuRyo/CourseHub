import { z } from 'zod';

export const paramsSchema = z.object({
  userId: z.string(),
  currentPage: z.number().int().positive(),
});
