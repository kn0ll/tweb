import { Effect, pipe } from "effect";

import { catchAndRunFork } from "./util/catchAndRunFork";

pipe(
  Effect.sync(() => {
    throw new Error("wtf");
  }),
  catchAndRunFork,
);
