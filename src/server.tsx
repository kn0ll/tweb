import * as Http from "@effect/platform-node/HttpServer";
import { Schema } from "@effect/schema";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";

const IdParams = Schema.struct({
  id: Schema.NumberFromString,
});

const Todo = Schema.struct({
  id: Schema.number,
  title: Schema.string,
});

const ServerLive = Http.server.layer(createServer, { port: 8080 });

const todoResponse = Http.response.schemaJson(Todo);

const main = pipe(
  Http.router.empty,
  Http.router.get(
    "/todos/:id",
    Effect.flatMap(Http.router.schemaParams(IdParams), ({ id }) =>
      todoResponse({ id, title: "test" }),
    ),
  ),
  Http.server.serve(),
  Effect.scoped,
  Effect.provide(ServerLive),
  Effect.catchAllCause(Effect.logError),
);

Effect.runFork(main);

// const route = Router.makeRoute(
//   "GET",
//   "/bar",
//   pipe(
//     ServerResponse.empty({ status: 200, statusText: "sup2" }),
//     Effect.succeed,
//   ),
// );

// const router = Router.fromIterable([route]);

// const app = pipe(
//   ServerResponse.empty({ status: 200, statusText: "sup1" }),
//   Effect.succeed,
// );

// // const x = Router.use(app)

// const main = pipe(
//   Server.serve(app),
//   Effect.scoped,
//   Effect.catchAllCause(Effect.logError),
//   // Effect.runFork,
// );

// export const app = pipe(
//   ServerResponse.empty({ status: 200, statusText: "sup" }),
//   Effect.succeed,
// );

// export const server = Server.make({
//   serve: () => pipe(Effect.succeed("foo"), Effect.forever),
//   address: {
//     _tag: "TcpAddress",
//     hostname: "localhost",
//     port: 6666,
//   },
// });

// pipe(
//   server.serve(app),
//   Effect.scoped,
//   Effect.catchAllCause(Effect.logError),
//   Effect.runFork,
// );
