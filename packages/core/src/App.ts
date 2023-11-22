/**
 * TODO: docs
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
 * TODO: i think we're losing `R` here which is important :o
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
    Effect.flatMap(({ url, method, urlParamsBody }) =>
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
      ),
    ),
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

// TODO: "loop through array and break at first" instead of match might give us correct types
//       maybe its validateFirst or forEach or something though
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
