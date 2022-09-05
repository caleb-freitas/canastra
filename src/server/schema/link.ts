import { z } from "zod";
import { customErrorMap } from "./custom-error-map";

z.setErrorMap(customErrorMap);

export const createLinkSchema = z.object({
  url: z.string().url()
})

export const deleteLinkByIdSchema = z.object({
  id: z.string().cuid()
})

export const updateLinkSchema = z.object({
  id: z.string().cuid(),
  url: z.string().url()
})

export type CreateLinkInput = z.TypeOf<typeof createLinkSchema>
export type DeleteLinkByIdInput = z.TypeOf<typeof deleteLinkByIdSchema>
export type UpdateLinkInput = z.TypeOf<typeof updateLinkSchema>
