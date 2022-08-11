import { Router } from "httpServer";

const healthRouter = new Router()
  .get("/readiness", (ctx) => {
    ctx.response.status = 200;
    ctx.response.body = "Ok";
  })
  .get("/liveness", (ctx) => {
    ctx.response.status = 200;
    ctx.response.body = "Ok";
  });

export default healthRouter;
