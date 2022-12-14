import { z } from "zod";

export const createLinkSchema = z.object({
  title: z.string().min(3).max(255),
  url: z.string().url()
})

export const deleteLinkByIdSchema = z.object({
  id: z.string().cuid()
})

export const updateLinkSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(3).max(255)
})

export const getLinkByIdSchema = z.object({
  id: z.string().cuid()
})

export type CreateLinkInput = z.TypeOf<typeof createLinkSchema>
export type DeleteLinkByIdInput = z.TypeOf<typeof deleteLinkByIdSchema>
export type UpdateLinkInput = z.TypeOf<typeof updateLinkSchema>
export type GetLinkByIdSchema = z.TypeOf<typeof getLinkByIdSchema>
