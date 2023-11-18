import { Effect, pipe } from "effect";

import * as DB from "./DB";
import * as Runtime from "./Runtime";

const print = pipe(Effect.log("Hello"), Effect.withSpan("print"));

const main = pipe(
  DB.resource,
  Effect.flatMap((db) => DB.query(db.user.findMany)()),
  Effect.flatMap((users) => pipe(print, Effect.repeatN(5))),
  Effect.scoped,
  Effect.withSpan("main"),
);

Runtime.run(main);
