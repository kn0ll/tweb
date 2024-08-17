/**
 * A `Route` is the core primitive of our HTTP server,
 * and binding `Location` schema instances to HTTP handlers.
 *
 * @since 1.0.0
 */

import type { HttpServerResponse } from "@effect/platform";
import type { Schema } from "@effect/schema";
import type { Effect } from "effect";
import type { Location } from "./HTTP.js";

/**
 * A `Route` is a pair of  `Location` schema `A`,
 * and a handler which accepts the parsed `A` as an argument.
 *
 * @since 1.0.0
 * @category types
 */
export type Route<A, E, R, I extends Location> = readonly [
	schema: Schema.Schema<A, I>,
	handler: (a: A) => Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>,
];

/**
 * Create a `Route` from a schema and a handler.
 * Even though a `Route` is only a tuple, this constructor is used
 * for type inference, passing the resulting `A` from the input schema
 * as an argument to the handler.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make = <A, E, R, I extends Location>(
	...route: Route<A, E, R, I>
) => route;
