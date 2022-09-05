import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server"
import { createRouter } from "./context";
import { createLinkSchema, deleteLinkByIdSchema } from "../schema/link";

export const linkRouter = createRouter()
  .mutation("add-link", {
    input: createLinkSchema,
    async resolve({ input, ctx }) {
      try {
        let { url } = input
        if (!url.startsWith("https://")) {
          url = "https://" + url
        }
        return await ctx.prisma.link.create({
          data: {
            url,
          }
        })
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Link already exists"
            })
          }
        }
      }
    }
  })
  .query("get-all-links", {
    async resolve({ ctx }) {
      return await ctx.prisma.link.findMany()
    }
  })
  .mutation("delete-link-by-id", {
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
            throw new trpc.TRPCError({
              code: "NOT_FOUND",
              message: `The record searched for in the where condition (link.id = "${input.id}") does not exist`
            })
          }
        }
      }
    }
  })
