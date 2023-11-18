import * as Http from "@effect/platform-node/HttpServer";
import { runMain } from "@effect/platform-node/Runtime";
import * as Server from "@effect/rpc-http/Server";
import { Console, Effect } from "effect";
import { createServer } from "http";

import * as Router from "../Router.js";

const server = Http.router.empty.pipe(
  Http.router.post("/rpc", Server.make(Router.make)),
  Http.server.serve(Http.middleware.logger),
  Effect.scoped,
);

Console.log("Listening on http://localhost:3000").pipe(
  Effect.zipRight(server),
  Effect.provide(
    Http.server.layer(createServer, {
      port: 3000,
    }),
  ),
  Effect.tapErrorCause(Effect.logError),
  runMain,
);
