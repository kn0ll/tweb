import * as Http from "@effect/platform-node/HttpServer";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";
import { Route, Router } from "tweb";

export const make = (routes: Route.Route<never, any, any>[]) =>
  pipe(
    Router.make(routes),
    Http.server.serve(),
    Effect.scoped,
    Effect.provide(Http.server.layer(createServer, { port: 8080 })),
    Effect.catchAllCause(Effect.logError),
  );
