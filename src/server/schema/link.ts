import { z } from "zod";

export const createLinkSchema = z.object({
  url: z.string()
})

export const deleteLinkByIdSchema = z.object({
  id: z.string()
})

export type CreateLinkInput = z.TypeOf<typeof createLinkSchema>
export type DeleteItemByIdInput = z.TypeOf<typeof deleteLinkByIdSchema>