import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === "url") {
      return {
        message: "Invalid URL. Please, make sure to provide a valid URL."
      }
    }
    if (issue.validation === "cuid") {
      return {
        message: "Invalid CUID. Please, make sure to provide a valid CUID."
      }
    }
  }
  return { message: ctx.defaultError };
};

export { customErrorMap }
