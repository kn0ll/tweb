import { Effect, pipe } from "effect";

export const catchAndRunFork = <E, A>(self: Effect.Effect<never, E, A>) =>
  pipe(self, Effect.catchAllCause(Effect.logError), Effect.runFork);
