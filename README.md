# Canastra

Application to save links and manage them for later access.

## Summary

- [How to run locally](#how-to-run-locally)

- [How to run in production](#how-to-run-in-production)

- [How the application works](#how-the-application-works)

- [Next features](#next-features)

- [Technologies](#technologies)

## How to run locally

- Add the following `datasource` and `generator` to your `prisma.schema` file:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

- Rename your [.example.env](./.example.env) file to `.env`

- Run `npx prisma db push` to apply the changes to the database

- Run `npm run dev` to start the application

## How to run in production

- Create a database at [PlanetScale](https://planetscale.com/)

- Using the PlanetScale CLI, run `pscale connect <DATABASE_NAME> main`

- Run `npx prisma db push` to apply the changes of your `prisma.schema` file to the database in production.

- Push your project to GitHub.

- Get the database URL (mysql://...) at PlanetScale and create a new deployment at vercel using this variable `DATABASE_URL`.

- Just wait for the generated link by vercel.

## How the application works

- On the `/` page you can provide a `title` and an `URL`, both strings, and those values will be stored on the database hosted on PlanetScale after you click on the `Add` button.

- On the `/links` page you can view all your links. On this same page, you can delete links and edit them.

- To edit, you need to click on the pencil icon. When this is done, you'll be redirected to `/links/[id]` using dynamic Next.js routes.

- On this page, you can edit the `title` and the `URL` of your link.

## Next features

- Google authentication using NextAuth.js.

- Pagination with Prisma and tRPC `useInfiniteQuery()`.

- Assign tags to links.

- Search bar using fuzzy finder (search by title and tag).

- Add tests to the tRPC API.

## Technologies

- [TypeScript](https://www.typescriptlang.org/)

- [tRPC](https://trpc.io)

- [Prisma](https://prisma.io)

- [PlanetScale](https://planetscale.com/)

- [Next.js](https://nextjs.org/)

- [Vercel](https://vercel.com/)

- [TailwindCSS](https://tailwindcss.com)
