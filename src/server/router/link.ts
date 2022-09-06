import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { createRouter } from "./context";
import { conflict, notFound } from "../errors/trpc-errors";
import {
  createLinkSchema,
  deleteLinkByIdSchema,
  getLinkByIdSchema,
  updateLinkSchema
} from "../schema/link";

export const linkRouter = createRouter()
  .query("get-all-links", {
    async resolve({ ctx }) {
      return await ctx.prisma.link.findMany()
    }
  })
  .query("get-link", {
    input: getLinkByIdSchema,
    async resolve({ input, ctx }) {
      try {
        return await ctx.prisma.link.findUnique({
          where: { id: input.id }
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
  .mutation("add-link", {
    input: createLinkSchema,
    async resolve({ input, ctx }) {
      try {
        console.log(input)
        return await ctx.prisma.link.create({
          data: {
            ...input
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
