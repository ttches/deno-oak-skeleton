import * as httpServer from "httpServer";
import {
  validateTokenMiddleware,
  errorHandler,
  requestLogger,
} from "./middleware/index.ts";
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
  .use(requestLogger)
  .use(validateTokenMiddleware)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen({ port });

export { router };
