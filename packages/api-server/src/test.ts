import * as DB from "@rpphub/db";
import * as Telemetry from "@rpphub/telemetry";
import { Effect, pipe } from "effect";

const print = pipe(Effect.log("Hello"), Effect.withSpan("print"));

const main = pipe(
  DB.resource,
  Effect.flatMap((db) => DB.query(db.user.findMany)()),
  Effect.flatMap((users) => {
    console.log(users);
    return pipe(print, Effect.repeatN(5));
  }),
  Effect.scoped,
  Effect.withSpan("main"),
);

const run = <E, A>(self: Effect.Effect<never, E, A>) =>
  pipe(
    self,
    Telemetry.provide(Telemetry.NodeSdk.layer),
    Effect.catchAllCause(Effect.logError),
    Effect.runFork,
  );

run(main);

// import { Effect } from "effect";
// import * as Client from "./Client.js";
// Effect.runPromise(Client.make().currentTime).then(console.log);
