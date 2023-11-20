import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import * as Http from "@effect/platform-node/HttpServer";
import * as Runtime from "@effect/platform-node/Runtime";
import { Schema } from "@effect/schema";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";

import { router } from "./router";

pipe(
  router([
    [
      Schema.struct({
        method: Schema.literal("GET"),
        pathname: Schema.literal("/"),
        // hash: Schema.null,
        search: Schema.null,
        // hash: Schema.union(Schema.null, Schema.literal("#description")),
        // search: Schema.struct({ username: Schema.string }),
      }),
      () => pipe("Hello World", ServerResponse.text, Effect.succeed),
    ],
    // [
    //   Schema.struct({
    //     method: Schema.literal("GET"),
    //     pathname: Schema.literal("/x"),
    //     // hash: Schema.null,
    //     search: Schema.null,
    //     // hash: Schema.union(Schema.null, Schema.literal("#description")),
    //     // search: Schema.struct({ username: Schema.string }),
    //   }),
    //   () => pipe("Hello World", ServerResponse.text, Effect.succeed),
    // ],
  ]),
  (x) => x,
  Http.server.serve(),
  Effect.scoped,
  Effect.provide(Http.server.layer(createServer, { port: 8080 })),
  Effect.catchAllCause(Effect.logError),
  Runtime.runMain,
);
