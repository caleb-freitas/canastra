import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { createRouter } from "./context";
import { createLinkSchema, deleteLinkByIdSchema, updateLinkSchema } from "../schema/link";
import { conflict, notFound } from "../errors/trpc-errors";

export const linkRouter = createRouter()
  .query("get-all-links", {
    async resolve({ ctx }) {
      return await ctx.prisma.link.findMany()
    }
  })
  .mutation("add-link", {
    input: createLinkSchema,
    async resolve({ input, ctx }) {
      try {
        if (!input.url) {
          console.log("shit happened")
        }
        return await ctx.prisma.link.create({
          data: {
            ...input,
          }
        })
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            conflict("URL")
          }
        }
      }
    }
  })
  .mutation("delete-link", {
    input: deleteLinkByIdSchema,
    async resolve({ input, ctx }) {
      try {
        return await ctx.prisma.link.delete({
          where: {
            id: input.id
          }
        })
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2001") {
            notFound(input.id)
          }
        }
      }
    }
  })
  .mutation("update-link", {
    input: updateLinkSchema,
    async resolve({ input, ctx }) {
      try {
        const { id, url } = input
        return await ctx.prisma.link.update({
          where: { id },
          data: { url }
        })
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2001") {
            notFound(input.id)
          }
        }
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            conflict("URL")
          }
        }
      }
    }
  })
