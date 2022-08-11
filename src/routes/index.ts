import * as httpServer from "httpServer";

import healthRouter from "./health.ts";

const v1Router = new httpServer.Router().use(
  healthRouter.routes(),
  healthRouter.allowedMethods()
);

const apiRouter = new httpServer.Router().use(
  "/v1",
  v1Router.routes(),
  v1Router.allowedMethods()
);

const router = new httpServer.Router().use(
  "/api",
  apiRouter.routes(),
  apiRouter.allowedMethods()
);

export default router;
export { healthRouter };
