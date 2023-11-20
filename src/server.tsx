import * as Http from "@effect/platform-node/HttpServer";
import * as Runtime from "@effect/platform-node/Runtime";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";

import { router } from "./router";

pipe(
  router(),
  Http.server.serve(),
  Effect.scoped,
  Effect.provide(Http.server.layer(createServer, { port: 8080 })),
  Effect.catchAllCause(Effect.logError),
  Runtime.runMain,
);
