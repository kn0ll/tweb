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

type Route<R, E, A> = [
  schema: Schema.Schema<A>,
  handler: (_a: A) => Effect.Effect<R, E, ServerResponse.ServerResponse>,
];

const foo = (routes: Route<unknown, unknown, unknown>[]) => (input: unknown) =>
  Effect.iterate(
    { routes, result: Option.none<ServerResponse.ServerResponse>() },
    {
      while: ({ result }) => Option.isNone(result),
      body: ({ routes, result }) =>
        pipe(
          routes,
          ReadonlyArray.head,
          Effect.flatMap(([schema, handler]) =>
            pipe(
              input,
              Schema.parse(schema),
              (x) => x,
              () => Effect.succeed({ routes, result }),
            ),
          ),
          () => Effect.succeed({ routes, result }),
        ),
    },
  );

export const router = <R, E, A>(handlers: Route<R, E, A>[]) => {
  const x = ReadonlyArray.map(handlers, ([schema, handler]) =>
    Match.when(Schema.is(schema), (a) => handler(a as A)),
  );

  // const y = pipe(...x);
  // console.log(y);
  console.log("x is ", x);
  // flow(() => 2, ...[() => 2, ...x]);

  return pipe(
    ServerRequest.ServerRequest,
    Effect.flatMap(parseRequest),
    Effect.flatMap(
      flow(
        Match.value,
        Match.when(Schema.is(handlers[0]![0]), (a) => handlers[0]![1](a as A)),
        // ...x,
        Match.orElse(() =>
          Effect.succeed(ServerResponse.empty({ status: 404 })),
        ),
      ),
    ),
  );
};

// Effect.loop
