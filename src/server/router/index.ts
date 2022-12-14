import { createRouter } from "./context";
import superjson from "superjson";
import { linkRouter } from "./link";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("links.", linkRouter);

export type AppRouter = typeof appRouter;
