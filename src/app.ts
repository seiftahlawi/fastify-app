import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/product/product.schema";
import productRoutes from "./modules/product/product.route";
import fjwt from "@fastify/jwt";
export const server = Fastify({
  logger: true,
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

server.register(fjwt, {
  secret: "sadasdasfgfdsagfdsgfdsfsdfdsfsdfsdf",
});
server.decorate(
  "authenticate",
  async (req: FastifyRequest, rep: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch (e) {
      console.log(e);
      rep.send(e);
    }
  }
);
server.get("/healthcheck", async () => {
  return { status: "OK" };
});

async function main() {
  for (const schema of [...userSchemas, ...productSchemas]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });
  server.register(productRoutes, { prefix: "api/products" });

  try {
    await server.listen(3001, "0.0.0.0");
    console.log("server ready at http://localhost:3001");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
main();
