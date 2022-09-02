import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server"
import { createRouter } from "./context";
import { createLinkSchema } from "../schema/link";

export const linkRouter = createRouter()
  .mutation("register-link", {
    input: createLinkSchema,
    async resolve({ input, ctx }) {
      try {
        return await ctx.prisma.link.create({
          data: {
            ...input
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
