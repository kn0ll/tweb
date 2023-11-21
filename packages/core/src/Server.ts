import * as Http from "@effect/platform-node/HttpServer";
import { Effect, flow } from "effect";
import { createServer } from "node:http";

import * as App from "./App.js";

export const make = flow(
  App.make,
  Http.server.serve(),
  Effect.scoped,
  Effect.provide(Http.server.layer(createServer, { port: 8080 })),
  Effect.catchAllCause(Effect.logError),
);
