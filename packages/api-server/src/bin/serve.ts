import { runMain } from "@effect/platform-node/Runtime";
import * as Telemetry from "@rpphub/telemetry";
import { Console, Effect, pipe } from "effect";

import * as Server from "../Server.js";

pipe(
  Console.log("Listening on http://localhost:3000"),
  Effect.zipRight(Server.make),
  Effect.provide(Server.layer),
  Effect.tapErrorCause(Effect.logError),
  Telemetry.provide(Telemetry.NodeSdk.layer),
  runMain,
);
