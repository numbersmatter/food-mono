import { z } from 'zod';

export const CreateSemesterSchema = z.object({
  name: z.string().min(4),
  startDate: z.date(),
  endDate: z.date(),
});
