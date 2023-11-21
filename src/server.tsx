// import * as ServerResponse from "@effect/platform/Http/Router";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import * as Http from "@effect/platform-node/HttpServer";
import * as Runtime from "@effect/platform-node/Runtime";
import { Schema } from "@effect/schema";
import { Effect, pipe } from "effect";
import { createServer } from "node:http";

import * as Router from "./Router";

// TODO: check if Router.fromIterable allows for multiple R/E?
// Router.fromIterable;

// To fix, this migiht work?
/*

const add = <OR, OE, OA>(router: Router<OR, OE, OA>) => <R, E, A>(route: [
  schema: Schema.Schema<A>,
  handler: (_a: A) => Effect.Effect<R, E, ServerResponse.ServerResponse>,
]) => Router<OR | R, OE | E, OA | A>

pipe(
  Router.empty,
  Router.add(schema, handler),
  Router.add(schema, handler),
  Router.add(schema, handler),
)
*/

pipe(
  Router.make(),
  Router.add([
    Schema.struct({
      method: Schema.literal("GET"),
      pathname: Schema.literal("/"),
      search: Schema.null,
    }),
    () => pipe("Home Page", ServerResponse.text, Effect.succeed),
  ]),
  Router.add([
    Schema.struct({
      method: Schema.literal("GET"),
      pathname: Schema.literal("/sign-up"),
      search: Schema.null,
    }),
    () => pipe("Sign Up", ServerResponse.text, Effect.succeed),
  ]),
  Router.app,
  (x) => x,
  Http.server.serve(),
  (x) => x,
  Effect.scoped,
  Effect.provide(Http.server.layer(createServer, { port: 8080 })),
  Effect.catchAllCause(Effect.logError),
  Runtime.runMain,
);

// pipe(
//   Router.make(),
//   (x) => x,
//   Router.add([
//     Schema.struct({
//       method: Schema.literal("GET"),
//       pathname: Schema.literal("/"),
//       search: Schema.null,
//     }),
//     () => pipe("Hello World", ServerResponse.text, Effect.succeed),
//   ]),
//   (x) => x,
// );

// pipe(
//   // router([
//   //   [
//   //     Schema.struct({
//   //       method: Schema.literal("GET"),
//   //       pathname: Schema.literal("/"),
//   //       search: Schema.null,
//   //     }),
//   //     () => pipe("Hello World", ServerResponse.text, Effect.succeed),
//   //   ],
//   //   // [
//   //   //   Schema.struct({
//   //   //     method: Schema.literal("GET"),
//   //   //     pathname: Schema.literal("/x"),
//   //   //     // hash: Schema.null,
//   //   //     search: Schema.null,
//   //   //     // hash: Schema.union(Schema.null, Schema.literal("#description")),
//   //   //     // search: Schema.struct({ username: Schema.string }),
//   //   //   }),
//   //   //   () => pipe("Hello World", ServerResponse.text, Effect.succeed),
//   //   // ],
//   // ]),
//   // (x) => x,
//   Http.server.serve(),
//   Effect.scoped,
//   Effect.provide(Http.server.layer(createServer, { port: 8080 })),
//   Effect.catchAllCause(Effect.logError),
//   Runtime.runMain,
// );
