import * as trpc from "@trpc/server"

export const notFound = (data: string) => {
  throw new trpc.TRPCError({
    code: "NOT_FOUND",
    message: `The record searched for in the where condition (link.id = "${data}") does not exist`
  })
}

export const conflict = (item: string) => {
  throw new trpc.TRPCError({
    code: "CONFLICT",
    message: `${item} already exists`
  })
}
