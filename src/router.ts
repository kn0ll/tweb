import * as ServerRequest from "@effect/platform/Http/ServerRequest";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { Effect, pipe } from "effect";

export const router = () =>
  pipe(
    ServerRequest.ServerRequest,
    Effect.flatMap((_request) =>
      pipe(
        ServerResponse.empty({ status: 401, statusText: "sup1" }),
        Effect.succeed,
      ),
    ),
  );
