/**
 * An `@effect/platform` app is a type extending
 * `Effect.Effect<ServerRequest, E, ServerResponse>`.
 *
 * This app satisfies the same type, but is constructed using a `tweb`
 * [Route](./Route.ts) list.
 *
 * @since 1.0.0
 */

import type { Default } from "@effect/platform/Http/App";
import type { RequestError } from "@effect/platform/Http/ServerError";
import type { Location } from "./HTTP.js";

import * as ServerRequest from "@effect/platform/Http/ServerRequest";
import { Schema } from "@effect/schema";
import { ParseError } from "@effect/schema/ParseResult";
import { Effect, identity, pipe, ReadonlyRecord } from "effect";
import querystring from "node:querystring";

import * as Route from "./Route.js";

/**
 * Given a `ServerRequest`, format it as a `Location` suitable for pattern
 * matching.
 *
 * @since 1.0.0
 * @category lifting
 */
export const requestToLocation = ({
  url,
  method,
  urlParamsBody,
}: ServerRequest.ServerRequest) =>
  pipe(
    urlParamsBody,
    Effect.flatMap((body) =>
      Effect.sync(() =>
        pipe(url.split("?"), ([pathname, search]) => ({
          method,
          pathname: pathname || "",
          search: search ? querystring.parse(search) : null,
          body: ReadonlyRecord.fromEntries(body),
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
 * @todo remove all type coercion
 * @todo probably dont want to attempt to parse url body params on every request
 * @todo this type of matching is probably grossly inefficient
 * @todo i think we're losing `R` and `E` here which is important :o
 * @since 1.0.0
 * @category constructors
 */
export const make = <R, E>(
  routes: Route.Route<R, E, any, any>[],
): Default<R, E | RequestError | ParseError[]> =>
  pipe(
    ServerRequest.ServerRequest,
    Effect.flatMap(requestToLocation),
    Effect.flatMap((location) =>
      Effect.validateFirst(routes, ([schema, handler]) =>
        pipe(
          location,
          Schema.parse(pipe(schema, Schema.omit("hash"))),
          Effect.map(handler),
        ),
      ),
    ),
    Effect.flatMap(identity),
  );
