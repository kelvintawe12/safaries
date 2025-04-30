import * as z from 'zod';
export const registerSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+243[0-9]{9}$/, "Phone number must start with +243 followed by 9 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  preferredLanguage: z.enum(['en', 'fr', 'rw']),
  consent: z.boolean().refine(val => val === true, "You must accept the privacy policy")
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
export const bookingSchema = z.object({
  tourId: z.number(),
  participants: z.number().min(1).max(20),
  tourDate: z.string().refine(val => new Date(val) > new Date(), "Tour date must be in the future"),
  specialRequests: z.string().optional(),
  paymentMethod: z.enum(['credit_card', 'bank_transfer', 'cash']),
  depositPaid: z.boolean().refine(val => val === true, "You must confirm the deposit payment")
});