import type { Schema } from "@effect/schema";
import type { Location } from "./HTTP.js";

import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Effect, flow } from "effect";

import * as Response from "./Response.js";

export type Route<R, E, A extends Location> = readonly [
  schema: Schema.Schema<A>,
  handler: (_a: A) => Effect.Effect<R, E, ServerResponse.ServerResponse>,
];

export const make = <R, E, A extends Location>(...route: Route<R, E, A>) =>
  route;

export const page = <A extends Location>(
  schema: Schema.Schema<A>,
  component: (_a: A) => JSX.Element,
) => make(schema, flow(component, Response.react, Effect.succeed));
