/**
 * A `Route` is the core primitive of our HTTP server,
 * and maps specialized `Location` schemas to HTTP handlers.
 */

import type { ServerResponse } from "@effect/platform/Http/ServerResponse";
import type { Schema } from "@effect/schema";
import type { Effect } from "effect";
import type { Location } from "./HTTP.js";

/**
 * A `Route` is a pair of  `Location` schema `A`,
 * and a handler which accepts the parsed `A` as an argument.
 *
 * @category types
 */
export type Route<R, E, A extends Location, T> = readonly [
  schema: Schema.Schema<A, T>,
  handler: (a: A) => Effect.Effect<R, E, ServerResponse>,
];

/**
 * Create a `Route` from a schema and a handler.
 * Even though a `Route` is only a tuple, this constructor is used
 * for type inference, passing the resulting `A` from the input schema
 * as an argument to the handler.
 *
 * @category constructors
 */
export const make = <R, E, A extends Location, T>(
  ...route: Route<R, E, A, T>
) => route;
