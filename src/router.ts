import * as ServerRequest from "@effect/platform/Http/ServerRequest";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Console, Effect, pipe } from "effect";

export const router = () =>
  pipe(
    ServerRequest.ServerRequest,
    Effect.flatMap((request) =>
      pipe(
        Console.log(request),
        Effect.flatMap(() =>
          pipe(
            ServerResponse.empty({ status: 401, statusText: "sup1" }),
            Effect.succeed,
          ),
        ),
      ),
    ),
  );
