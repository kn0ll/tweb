import * as DB from "@rpphub/db";
import { Effect, pipe } from "effect";

import * as Runtime from "./Runtime.js";

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

Runtime.run(main);
