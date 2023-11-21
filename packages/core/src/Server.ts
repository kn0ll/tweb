import type { Route } from "tweb";

import * as Http from "@effect/platform-node/HttpServer";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";

import * as App from "./App.js";

export const make = (routes: Route.Route<never, any, any>[]) =>
  pipe(
    App.make(routes),
    Http.server.serve(),
    Effect.scoped,
    Effect.provide(Http.server.layer(createServer, { port: 8080 })),
    Effect.catchAllCause(Effect.logError),
  );
