import * as ServerRequest from "@effect/platform/Http/ServerRequest";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Schema } from "@effect/schema";
import { Effect, flow, identity, Match, pipe, ReadonlyRecord } from "effect";
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

export const router = <R, E, A>([schema, handler]: [
  schema: Schema.Schema<A>,
  handler: (_a: A) => Effect.Effect<R, E, ServerResponse.ServerResponse>,
]) =>
  pipe(
    ServerRequest.ServerRequest,
    Effect.flatMap(parseRequest),
    Effect.flatMap(
      flow(
        Match.value,
        Match.when(Schema.is(schema), (a) => handler(a as A)),
        Match.orElse(() =>
          Effect.succeed(ServerResponse.empty({ status: 404 })),
        ),
      ),
    ),
  );
