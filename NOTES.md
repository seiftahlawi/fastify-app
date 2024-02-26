## dependencies

npm i @prisma/client fastify fastify-zod zod zod-to-json-schema fastify-jwt fastify-swagger

## devDependencies

npm i ts-node-dev typescript @types/node --dev

## Initialise prisma

npx prisma init --datasource-provider postgresql

### Migrate the schema

npx prisma migrate dev --name name_of_migration
