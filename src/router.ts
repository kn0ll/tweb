import * as ServerRequest from "@effect/platform/Http/ServerRequest";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Console, Effect, pipe } from "effect";
import querystring from "node:querystring";
import url from "node:url";

export const router = () =>
  pipe(
    ServerRequest.ServerRequest,
    Effect.flatMap((request) =>
      pipe(
        Effect.sync(() => url.parse(request.url)),
        Effect.map((parsed) => ({
          method: request.method,
          pathname: parsed.pathname,
          search: querystring.parse(parsed.search?.slice(1) || ""),
        })),
        Effect.flatMap(Console.log),
        Effect.flatMap(() =>
          pipe(
            ServerResponse.empty({ status: 401, statusText: "sup1" }),
            Effect.succeed,
          ),
        ),
      ),
    ),
  );
