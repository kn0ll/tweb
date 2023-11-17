import { Effect, pipe } from "effect";

import * as Telemetry from "./Telemetry";

export const run = <E, A>(
  self: Effect.Effect<never, E, A>,
  telemetry = Telemetry.provide,
) =>
  pipe(self, telemetry, Effect.catchAllCause(Effect.logError), Effect.runFork);
