import { NodeSdk } from "@effect/opentelemetry";
import * as Telemetry from "@rpphub/telemetry";
import { Effect, pipe } from "effect";

export const run = <E, A>(self: Effect.Effect<never, E, A>) =>
  pipe(
    self,
    Telemetry.provide(NodeSdk.layer),
    Effect.catchAllCause(Effect.logError),
    Effect.runFork,
  );
