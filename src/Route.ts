import type { ServerResponse } from "@effect/platform/Http/ServerResponse";
import type { Schema } from "@effect/schema";
import type { Effect } from "effect";
import type { Location } from "./HTTP";

export type Route<R, E, A extends Location> = readonly [
  schema: Schema.Schema<A>,
  handler: (_a: A) => Effect.Effect<R, E, ServerResponse>,
];

export const make = <R, E, A extends Location>(...args: Route<R, E, A>) => args;
