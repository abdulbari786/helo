import { z } from 'zod'

/** Shared by the enquiry form (client) and /api/contact (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid work email').max(160),
  company: z.string().trim().min(1, 'Please enter your company or organisation').max(120),
  role: z.string().trim().max(100).optional().or(z.literal('')),
  goal: z
    .string()
    .trim()
    .min(20, 'A sentence or two helps us prepare (20+ characters)')
    .max(3000, 'Please keep this under 3000 characters'),
  interests: z.array(z.string().max(80)).max(12),
  budget: z.string().max(60).optional().or(z.literal('')),
  timeline: z.string().max(60).optional().or(z.literal('')),
  source: z.string().max(60).optional().or(z.literal('')),
  context: z.string().max(160).optional().or(z.literal('')),
  /** Honeypot: must stay empty. */
  website: z.string().max(0).optional().or(z.literal('')),
})

export type ContactInput = z.infer<typeof contactSchema>
