import { Middleware } from "httpServer";

const logRequest: Middleware = async (ctx, next) => {
  const path = ctx.request.url;
  const method = ctx.request.method;
  const { response } = ctx;

  let status = "unknown";

  console.info(`Received ${method} ${path.pathname}`);
  await next();
  status = response.status.toString();
  console.info(`Success ${status} => ${method} ${path.pathname}`);
};

export default logRequest;
