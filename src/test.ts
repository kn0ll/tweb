import { Effect, pipe } from "effect";

import * as Runtime from "./Runtime";

const main = pipe(
  Effect.log("Hello"),
  Effect.withSpan("d"),
  Effect.withSpan("b"),
  Effect.withSpan("rrrrrr"),
  Effect.repeatN(5),
  Effect.annotateSpans("working", true),
);

Runtime.run(main);
