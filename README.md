# Canastra

Application to save links and manage them to later access.

## How to run

### Locally

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

- Have fun!
