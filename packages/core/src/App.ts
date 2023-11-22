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
import type { Route } from "./Route.js";

import * as ServerRequest from "@effect/platform/Http/ServerRequest";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Schema } from "@effect/schema";
import {
  Effect,
  Either,
  flow,
  Match,
  pipe,
  ReadonlyArray,
  ReadonlyRecord,
} from "effect";
import querystring from "node:querystring";

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
 * @todo i think we're losing `R` here which is important :o
 * @since 1.0.0
 * @category constructors
 */
export const make = <R, E, A extends Location, T>(
  router: Route<R, E, any, any>[],
): Default<R, E | RequestError> => {
  const matchers = ReadonlyArray.map(router, ([aa, bb]) =>
    Match.when(
      flow(Schema.parseEither(pipe(aa, Schema.omit("hash"))), Either.isRight),
      bb,
    ),
  ) as [
    <I, F, A, Pr>(
      _self: Match.Matcher<I, F, unknown, A, Pr>,
    ) => Match.Matcher<
      I,
      Match.Types.AddWithout<F, any>,
      Match.Types.ApplyFilters<I, Match.Types.AddWithout<F, any>>,
      Effect.Effect<R, E, ServerResponse.ServerResponse> | A,
      Pr
    >,
  ];

  return pipe(
    ServerRequest.ServerRequest,
    Effect.flatMap(requestToLocation),
    Effect.flatMap(
      flow(
        Match.value,
        ...matchers,
        Match.orElse(() =>
          Effect.succeed(ServerResponse.empty({ status: 404 })),
        ),
      ),
    ),
  );
};

// SCRATCH (FOR MY EYES ONLY): this should probably replace the rats nest above
// TODO: "loop through array and break at first" instead of match might give us
//       correct types maybe its validateFirst or forEach or something though
// const foo = (routes: Route<unknown, unknown, unknown>[]) => (input: unknown) =>
//   pipe(
//     Effect.iterate(
//       { routes, result: Option.none<ServerResponse.ServerResponse>() },
//       {
//         while: ({ routes, result }) =>
//           ReadonlyArray.isEmptyArray(routes) && Option.isNone(result),
//         body: ({ routes, result }) =>
//           pipe(
//             routes,
//             ReadonlyArray.head,
//             Effect.flatMap(([schema, handler]) =>
//               pipe(
//                 input,
//                 Schema.parse(schema),
//                 Effect.catchAll(() =>
//                   pipe(routes, ReadonlyArray.tail, (routes) =>
//                     Effect.succeed({ routes, result }),
//                   ),
//                 ),
//                 Effect.flatMap(handler),
//               ),
//             ),
//             () => Effect.succeed({ routes, result }),
//           ),
//       },
//     ),
//     Effect.map(({ result }) => result),
//   );
