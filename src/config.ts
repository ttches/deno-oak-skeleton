import { config } from "dotenv";

config({
  export: true,
});

const env = Deno.env.get("DENO_ENV") ?? "local";
const port = Number(Deno.env.get("PORT") ?? 4006);
const appBasePath = Deno.env.get("APP_BASE_PATH");
const authAudience = Deno.env.get("AUTH_AUDIENCE");
const authClientId = Deno.env.get("AUTH_CLIENT");
const authIssuer = Deno.env.get("AUTH_ISSUER");
const authJWKSet = Deno.env.get("AUTH_JWKSET_URL");
const authSecret = Deno.env.get("AUTH_SECRET");

export {
  appBasePath,
  authAudience,
  authClientId,
  authIssuer,
  authJWKSet,
  authSecret,
  env,
  port,
};
