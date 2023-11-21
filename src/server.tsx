import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import * as Http from "@effect/platform-node/HttpServer";
import * as Runtime from "@effect/platform-node/Runtime";
import { Schema } from "@effect/schema";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";

import * as Router from "./Router";

const routes = [
  [
    Schema.struct({
      method: Schema.literal("GET"),
      pathname: Schema.literal("/"),
      search: Schema.null,
    }),
    () => pipe("Home Page", ServerResponse.text, Effect.succeed),
  ],
  [
    Schema.struct({
      method: Schema.literal("GET"),
      pathname: Schema.literal("/sign-up"),
      search: Schema.null,
    }),
    () => pipe("Sign Up", ServerResponse.text, Effect.succeed),
  ],
] as const;

pipe(
  Router.make(routes),
  Http.server.serve(),
  Effect.scoped,
  Effect.provide(Http.server.layer(createServer, { port: 8080 })),
  Effect.catchAllCause(Effect.logError),
  Runtime.runMain,
);
