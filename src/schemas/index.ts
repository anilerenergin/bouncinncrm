import { z } from "zod";

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    success: z.boolean(),
    message: z.string().optional(),
  }) as unknown as z.ZodType<ApiResponse<z.infer<T>>>;

export type PaginatedResponse<T> = {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export const paginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    totalCount: z.number(),
    page: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
  }) as unknown as z.ZodType<PaginatedResponse<z.infer<T>>>;

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(["admin", "user", "moderator"]),
  createdAt: z.string().datetime(),
});

export const authTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.number(),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema
  .extend({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserSchema = z.infer<typeof userSchema>;
export type AuthTokensSchema = z.infer<typeof authTokensSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

// Event Management Schemas
export const appUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  surname: z.string(),
  mail: z.string().email(),
  password: z.string(),
  role: z.enum(["admin", "user", "promoter", "staff"]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const companySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  status: z.enum(["active", "passive", "deleted"]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const venueSchema = z.object({
  id: z.string().uuid(),
  company_id: z.string().uuid(),
  name: z.string(),
  capacity: z.number().nullable(),
  address: z.string().nullable(),
  cover_image: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const guestSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  event_id: z.string().uuid(),
  status: z.enum(["invited", "confirmed", "attended", "cancelled"]),
  promoter_id: z.string().uuid().nullable(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).nullable(),
  age: z.number().nullable(),
  is_first_timer: z.boolean(),
  is_returning: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const eventSchema = z.object({
  id: z.string().uuid(),
  venue_id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  capacity: z.number().nullable(),
  cover_image: z.string().nullable(),
  start_date_time: z.string().datetime(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  venue: venueSchema.optional(),
  guest_count: z.number().optional(),
  promoter_count: z.number().optional(),
});

export const paginationMetaSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
});

export const paginatedEventsSchema = z.object({
  data: z.array(eventSchema),
  pagination: paginationMetaSchema,
});

export type AppUserSchema = z.infer<typeof appUserSchema>;
export type CompanySchema = z.infer<typeof companySchema>;
export type VenueSchema = z.infer<typeof venueSchema>;
export type GuestSchema = z.infer<typeof guestSchema>;
export type EventSchema = z.infer<typeof eventSchema>;
export type PaginationMetaSchema = z.infer<typeof paginationMetaSchema>;
export type PaginatedEventsSchema = z.infer<typeof paginatedEventsSchema>;
