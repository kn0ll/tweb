import { PrismaClient } from "@rpphub/db";
import { Effect, pipe } from "effect";

export const resource = Effect.acquireRelease(
  Effect.succeed(new PrismaClient()),
  (client) => Effect.promise(() => client.$disconnect()),
);

export const query =
  <ARGS extends unknown[], A>(fn: (...args: ARGS) => Promise<A>) =>
  (...args: ARGS) =>
    pipe(Effect.tryPromise(() => fn(...args)));
