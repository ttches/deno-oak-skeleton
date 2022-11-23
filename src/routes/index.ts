import * as httpServer from "httpServer";

// import graphqlRouter from "./graphql.ts";
import healthRouter from "./health.ts";
import swaggerRouter from "./swagger.ts";

const v1Router = new httpServer.Router()
  .use(healthRouter.routes(), healthRouter.allowedMethods())
  .use(swaggerRouter.routes(), swaggerRouter.allowedMethods());

const apiRouter = new httpServer.Router().use(
  "/v1",
  v1Router.routes(),
  v1Router.allowedMethods()
);

const router = new httpServer.Router()
  .use("/api", apiRouter.routes(), apiRouter.allowedMethods())
  .get("/swagger", async (ctx) => {
    await httpServer.send(ctx, "./src/openApi/index.html");
  });
// .use("/graphql", graphqlRouter.routes(), graphqlRouter.allowedMethods());

export default router;
export { healthRouter };
