import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import * as Http from "@effect/platform-node/HttpServer";
import * as Runtime from "@effect/platform-node/Runtime";
import { Schema } from "@effect/schema";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";

import * as Route from "./Route";
import * as Router from "./Router";

const route1 = Route.make(
  Schema.struct({
    method: Schema.literal("GET"),
    pathname: Schema.literal("/"),
    search: Schema.null,
  }),
  ({ method, pathname, search }) =>
    pipe("Home Page", ServerResponse.text, Effect.succeed),
);

const route2 = Route.make(
  Schema.struct({
    method: Schema.literal("GET"),
    pathname: Schema.literal("/sign-up"),
    search: Schema.null,
  }),
  ({ method, pathname, search }) =>
    pipe("Sign Up", ServerResponse.text, Effect.succeed),
);

pipe(
  Router.make([route1, route2]),
  Http.server.serve(),
  Effect.scoped,
  Effect.provide(Http.server.layer(createServer, { port: 8080 })),
  Effect.catchAllCause(Effect.logError),
  Runtime.runMain,
);
