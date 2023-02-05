import { z } from 'zod'

export const CourtSchema = z.object({
  clubId: z.string().min(1).max(100),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  price: z.number(),
  type: z.string().min(1).max(100),
  surface: z.string().min(1).max(100),
  lights: z.boolean(),
  indoor: z.boolean()
})

export const ClubSchema = z.object({
  user_id: z.string().min(1).max(100).optional(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  schedule: z.string().min(1).max(1000),
  phone: z.string().min(1).max(50),
  address: z.string().min(1).max(1000),
  latitude: z.number(),
  longitude: z.number(),
  courtsQuantity: z.number().min(1).max(40).optional(),
  courts: z.array(CourtSchema).optional()
})

export type ClubSchemaType = z.TypeOf<typeof ClubSchema>
