import { createRemoteJWKSet, jwtVerify } from "jose";
import { Context, Middleware } from "httpServer";

import { ContextState } from "../main.ts";
import { authAudience, authJWKSet } from "../config.ts";

const validateToken = async (jwt: string) => {
  const JWKS = createRemoteJWKSet(new URL(authJWKSet!));

  const decoded = await jwtVerify(jwt, JWKS, {
    // issuer: "urn:example:issuer",
    audience: authAudience,
  });
  return decoded.payload;
};

const validateTokenMiddleware: Middleware = async (
  ctx: Context<ContextState>,
  next
) => {
  try {
    const jwt = ctx.request.headers.get("Authorization")?.split("Bearer ")?.[1];

    if (!jwt) {
      await next();
      return;
    }

    const { exp, sub } = await validateToken(jwt);

    // TODO: should also check if expired?
    if (exp !== undefined && sub !== undefined) {
      ctx.state.user = { exp, sub };
    }
  } catch (err) {
    // TODO: Test if we can throw an httpError here
    console.log("validation error", err);
    ctx.response.body = "Unauthorized";
    ctx.response.status = 401;
    return;
  }

  await next();
};

export { validateTokenMiddleware };
