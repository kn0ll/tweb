import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Schema } from "@effect/schema";
import { Effect } from "effect";

import { Location } from "./HTTP";

export type Route<R, E, A extends Location> = readonly [
  schema: Schema.Schema<A>,
  handler: (_a: A) => Effect.Effect<R, E, ServerResponse.ServerResponse>,
];

export const make = <R, E, A extends Location>(...args: Route<R, E, A>) => args;
