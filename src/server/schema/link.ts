import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === "url") {
      console.error(issue)
      return {
        message: "Invalid URL. Please, make sure to provide a valid URL."
      }
    }
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export const createLinkSchema = z.object({
  url: z.string({ errorMap: customErrorMap }).url()
})

export const deleteLinkByIdSchema = z.object({
  id: z.string()
})

export type CreateLinkInput = z.TypeOf<typeof createLinkSchema>
export type DeleteItemByIdInput = z.TypeOf<typeof deleteLinkByIdSchema>