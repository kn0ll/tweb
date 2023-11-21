import type { Schema } from "@effect/schema";
import type { Location } from "./HTTP.js";

import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Effect } from "effect";

export type Route<R, E, A extends Location> = readonly [
  schema: Schema.Schema<A>,
  handler: (_a: A) => Effect.Effect<R, E, ServerResponse.ServerResponse>,
];

export const make = <R, E, A extends Location>(...route: Route<R, E, A>) =>
  route;
