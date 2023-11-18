import { PrismaClient } from "@rpphub/db";
import { Effect, pipe } from "effect";

export const resource = Effect.acquireRelease(
  pipe(
    Effect.succeed(new PrismaClient()),
    Effect.withSpan("Prisma.resource.acquire"),
  ),
  (client) =>
    pipe(
      Effect.promise(() => client.$disconnect()),
      Effect.withSpan("Prisma.resource.release"),
    ),
);

export const query =
  <ARGS extends unknown[], A>(fn: (...args: ARGS) => Promise<A>) =>
  (...args: ARGS) =>
    pipe(
      Effect.tryPromise(() => fn(...args)),
      Effect.withSpan("Prisma.query"),
      Effect.annotateSpans("args", args),
    );
