import * as ServerRequest from "@effect/platform/Http/ServerRequest";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Console, Effect, identity, pipe, ReadonlyRecord } from "effect";
import querystring from "node:querystring";

const parsePath = (path: string) =>
  Effect.sync(() => {
    const [pathname, search] = path.split("?");

    return {
      pathname: pathname || "",
      search: search ? querystring.parse(search) : null,
    };
  });

export const router = () =>
  pipe(
    ServerRequest.ServerRequest,
    Effect.flatMap((request) =>
      pipe(
        parsePath(request.url),
        Effect.map(ReadonlyRecord.union({ method: request.method }, identity)),
        Effect.flatMap((x) => Console.log(x)),
        Effect.flatMap(() =>
          pipe(
            ServerResponse.empty({ status: 401, statusText: "sup1" }),
            Effect.succeed,
          ),
        ),
      ),
    ),
  );
