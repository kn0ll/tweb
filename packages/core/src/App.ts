import type { Default } from "@effect/platform/Http/App";
import type { Location } from "./HTTP.js";
import type { Route } from "./Route.js";

import * as ServerRequest from "@effect/platform/Http/ServerRequest";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Schema } from "@effect/schema";
import {
  Effect,
  flow,
  identity,
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
): Default<R, E> => {
  const matchers = ReadonlyArray.map(router, ([aa, bb]) =>
    Match.when(
      // TODO: remove body!! it was just for debugging new form!!!
      Schema.is(pipe(aa, Schema.omit("hash"), Schema.omit("body"))),
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
    Effect.flatMap(({ url, method }) =>
      pipe(
        Effect.sync(() =>
          pipe(url.split("?"), ([pathname, search]) => ({
            pathname: pathname || "",
            search: search ? querystring.parse(search) : null,
          })),
        ),
        Effect.map(ReadonlyRecord.union({ method }, identity)),
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
