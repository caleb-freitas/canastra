import { z } from "zod";

export const createLinkSchema = z.object({
  url: z.string()
})

export type CreateItemInput = z.TypeOf<typeof createLinkSchema>