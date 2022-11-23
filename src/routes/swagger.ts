import { Router } from "httpServer";
import swaggerDoc from "swagger";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Deno Skeleton API",
    version: "1.0.0",
    description: "",
  },
  servers: [
    {
      url: "http://localhost:4006/api/v1",
    },
  ],
  tags: [{ name: "health", description: "" }],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/openApi/swagger.yaml"],
};

const swaggerSpec = swaggerDoc(options);

const swaggerRouter = new Router().get("/swagger", (ctx) => {
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.status = 200;
  ctx.response.body = swaggerSpec;
});

export default swaggerRouter;
