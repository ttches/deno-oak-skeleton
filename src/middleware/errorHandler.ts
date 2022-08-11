import { isHttpError, Middleware } from "httpServer";

const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      console.log("isHttpError");
      ctx.response.status = err.status || 500;
      ctx.response.body = { error: err.message || "Internal Server Error" };
    } else {
      console.log("errorHandler else", err);
      ctx.response.status = err.status || 500;
      ctx.response.body = { error: err.message || "Internal Server Error" };
    }
  }
};

export default errorHandler;
