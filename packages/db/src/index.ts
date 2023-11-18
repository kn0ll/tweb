import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { Resource } from "@opentelemetry/resources";
import {
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { PrismaInstrumentation } from "@prisma/instrumentation";
import * as Telemetry from "@rpphub/telemetry";
import { Effect, identity, pipe } from "effect";
import { constant } from "effect/Function";

import { PrismaClient } from "./client/index.js";

const client = pipe(
  Effect.sync(() => new PrismaClient()),
  Effect.withSpan("Prisma.client"),
);

const telemetry = pipe(
  Effect.all({
    resource: Telemetry.resource,
    spanExporter: Telemetry.spanExporter,
  }),
  Effect.flatMap(({ resource, spanExporter }) =>
    Effect.sync(() => {
      const tracerProvider = new NodeTracerProvider({
        resource: new Resource(resource),
      });

      tracerProvider.addSpanProcessor(new SimpleSpanProcessor(spanExporter));

      registerInstrumentations({
        tracerProvider,
        instrumentations: [new PrismaInstrumentation()],
      });

      tracerProvider.register();
    }),
  ),
  Effect.withSpan("Prisma.telemetry"),
);

export const resource = Effect.acquireRelease(
  pipe(
    telemetry,
    Effect.flatMap(constant(client)),
    Effect.cached,
    Effect.flatMap(identity),
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
