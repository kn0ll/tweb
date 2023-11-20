import * as ServerRequest from "@effect/platform/Http/ServerRequest";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Schema } from "@effect/schema";
import {
  Console,
  Effect,
  flow,
  identity,
  Match,
  pipe,
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

export const router = <R, E, A>([_chema, handler]: [
  schema: Schema.Schema<A>,
  handler: () => Effect.Effect<R, E, ServerResponse.ServerResponse>,
  // handler: (_a: A) => Effect.Effect<R, E, ServerResponse.ServerResponse>,
]) =>
  pipe(
    ServerRequest.ServerRequest,
    Effect.flatMap((request) =>
      pipe(
        parsePath(request.url),
        Effect.map(ReadonlyRecord.union({ method: request.method }, identity)),
        Effect.tap(Console.log),
        Effect.flatMap(
          flow(
            Match.value,
            Match.when(
              () => true,
              () => handler(),
            ),
            Match.orElse(() =>
              pipe(ServerResponse.empty({ status: 404 }), Effect.succeed),
            ),
          ),
        ),
      ),
    ),
  );
