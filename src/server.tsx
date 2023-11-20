import * as Http from "@effect/platform-node/HttpServer";
import { Schema } from "@effect/schema";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";

pipe(
  Http.router.empty,
  Http.router.get(
    "/todos/:id",
    pipe(
      Http.router.schemaParams(
        Schema.struct({
          id: Schema.NumberFromString,
        }),
      ),
      Effect.flatMap(({ id }) =>
        pipe(
          { id, title: "test" },
          Http.response.schemaJson(
            Schema.struct({
              id: Schema.number,
              title: Schema.string,
            }),
          ),
        ),
      ),
    ),
  ),
  Http.server.serve(),
  Effect.scoped,
  Effect.provide(Http.server.layer(createServer, { port: 8080 })),
  Effect.catchAllCause(Effect.logError),
  Effect.runFork,
);
