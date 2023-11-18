import * as Telemetry from "@rpphub/telemetry";
import { Effect, pipe } from "effect";

console.log(Telemetry);

export const run = <E, A>(self: Effect.Effect<never, E, A>) =>
  pipe(
    self,
    Telemetry.provide(Telemetry.NodeSdk.layer),
    Effect.catchAllCause(Effect.logError),
    Effect.runFork,
  );
