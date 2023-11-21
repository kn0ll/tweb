import * as ServerRequest from "@effect/platform/Http/ServerRequest";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Schema } from "@effect/schema";
import {
  Effect,
  flow,
  identity,
  Match,
  Option,
  pipe,
  ReadonlyArray,
  ReadonlyRecord,
} from "effect";
import querystring from "node:querystring";

type Route<R, E, A> = [
  schema: Schema.Schema<A>,
  handler: (_a: A) => Effect.Effect<R, E, ServerResponse.ServerResponse>,
];
// Router.searchParams
const parsePath = (path: string) =>
  Effect.sync(() => {
    const [pathname, search] = path.split("?");

    return {
      pathname: pathname || "",
      search: search ? querystring.parse(search) : null,
    };
  });

const parseRequest = ({ url, method }: ServerRequest.ServerRequest) =>
  pipe(parsePath(url), Effect.map(ReadonlyRecord.union({ method }, identity)));

export const make = (router = []) => router;

export const add = <R, E, A>(route: Route<R, E, A>) =>
  ReadonlyArray.append(route);

export const app = <R, E>(routes: Route<R, E, any>[]) => {
  const matchers = ReadonlyArray.map(routes, ([aa, bb]) =>
    Match.when(Schema.is(aa), (a) => bb(a as A)),
  );

  const f = (
    a: any[],
  ): [
    <I, F, A, Pr>(
      _self: Match.Matcher<I, F, unknown, A, Pr>,
    ) => Match.Matcher<
      I,
      Match.Types.AddWithout<F, any>,
      Match.Types.ApplyFilters<I, Match.Types.AddWithout<F, any>>,
      Effect.Effect<any, any, any> | A,
      Pr
    >,
  ] => a;

  return pipe(
    ServerRequest.ServerRequest,
    Effect.flatMap(parseRequest),
    Effect.flatMap(
      flow(
        Match.value,
        ...f(matchers),
        Match.orElse(() =>
          Effect.succeed(ServerResponse.empty({ status: 404 })),
        ),
      ),
    ),
  );
};

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
