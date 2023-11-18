import { HttpServer } from "@effect/platform-node";
import { Server } from "@effect/rpc-http";
import { Effect, pipe } from "effect";
import { createServer } from "http";

import * as Router from "./Router.js";

export const make = pipe(
  HttpServer.router.empty,
  HttpServer.router.post("/rpc", Server.make(Router.make)),
  HttpServer.server.serve(HttpServer.middleware.logger),
  Effect.scoped,
);

export const layer = HttpServer.server.layer(createServer, {
  port: 3000,
});

export type { Platform } from "@effect/platform/Http/Platform";
