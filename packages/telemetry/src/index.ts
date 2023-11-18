import type { Resource } from "@effect/opentelemetry";
import type { Layer } from "effect";

import { NodeSdk } from "@effect/opentelemetry";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Config, Effect, identity, pipe } from "effect";

export { NodeSdk };

export const resource = pipe(
  Effect.config(
    pipe(
      Config.string("TELEMETRY_RESOURCE_SERVICE_NAME"),
      Config.withDefault("default"),
    ),
  ),
  Effect.map((serviceName) => ({ serviceName })),
);

export const spanExporter = pipe(
  Effect.config(
    pipe(
      Config.string("TELEMETRY_SPAN_PROCESSOR_URL"),
      Config.withDefault("http://telemetry:4318/v1/traces"),
    ),
  ),
  Effect.flatMap((url) => Effect.sync(() => new OTLPTraceExporter({ url }))),
  Effect.cached,
  Effect.flatMap(identity),
);

export const provide =
  (
    layer: (
      evaluate: () => NodeSdk.Configuration,
    ) => Layer.Layer<never, never, Resource.Resource>,
  ) =>
  <R, E, A>(self: Effect.Effect<R, E, A>) =>
    pipe(
      Effect.all({ exporter: spanExporter, resource }),
      Effect.flatMap(({ resource, exporter }) =>
        Effect.provide(
          self,
          layer(() => ({
            resource,
            spanProcessor: new BatchSpanProcessor(exporter),
          })),
        ),
      ),
    );
