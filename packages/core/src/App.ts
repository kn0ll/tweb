/**
 * An `@effect/platform` app is a type extending
 * `Effect.Effect<ServerRequest, E, ServerResponse>`.
 *
 * This app satisfies the same type, but is constructed using a `a-web`
 * [Route](./Route.ts) list.
 *
 * @since 0.0.1
 */

import type { HttpApp, HttpServerError } from "@effect/platform";
import type * as Route from "./Route.js";

import querystring from "node:querystring";
import { HttpServerRequest } from "@effect/platform";
import { Schema } from "@effect/schema";
import { Effect, Record, pipe } from "effect";

/**
 * Given a `ServerRequest`, format it as a `Location` suitable for pattern
 * matching.
 *
 * @since 0.0.1
 * @category lifting
 */
export const requestToLocation = ({
	url,
	method,
	urlParamsBody,
}: HttpServerRequest.HttpServerRequest) =>
	pipe(
		urlParamsBody,
		Effect.flatMap((body) =>
			Effect.sync(() =>
				pipe(url.split("?"), ([pathname, search]) => ({
					method,
					pathname: pathname || "",
					search: search ? querystring.parse(search) : null,
					body: Record.fromEntries(body),
				})),
			),
		),
	);

/**
 * Given a [Route](./Route.ts) list, construct an `@effect/platform` app.
 * This works is by pattern matching the request against the input
 * [Route](./Route.ts) schemas.
 *
 * One implication of this is that the order of your routes matters:
 * the first route that matches will be the one whose handler executed.
 *
 * @todo fix any?
 * @todo probably dont want to attempt to parse url body params on every request
 * @todo i think we're losing `R` and `E` here which is important :o
 * @since 0.0.1
 * @category constructors
 */
export const make = <E, R>(
	// biome-ignore lint/suspicious/noExplicitAny: TODO
	routes: Route.Route<any, E, R, any>[],
) =>
	pipe(
		HttpServerRequest.HttpServerRequest,
		Effect.flatMap(requestToLocation),
		Effect.flatMap((location) =>
			Effect.validateFirst(routes, ([schema, handler]) =>
				pipe(
					location,
					Schema.decode(pipe(schema, Schema.omit("hash"))),
					Effect.flatMap(handler),
				),
			),
		),
	);
