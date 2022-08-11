import * as httpServer from "httpServer";
import logger from "logger";

import { validateTokenMiddleware, errorHandler } from "./middleware/index.ts";
import router from "./routes/index.ts";
import { port } from "./config.ts";

export type ContextState = {
  user?: {
    exp: number;
    sub: string;
  };
};

console.info(`http://localhost:${port}`);

await new httpServer.Application<ContextState>()
  .use(errorHandler)
  .use(logger.logger)
  .use(logger.responseTime)
  .use(validateTokenMiddleware)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen({ port });

export { router };
