import type { Resource } from "@effect/opentelemetry";
import type { Layer } from "effect";

import { NodeSdk } from "@effect/opentelemetry";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Config, Effect, pipe } from "effect";

export const config = Config.all({
  serviceName: pipe(
    Config.string("TELEMETRY_RESOURCE_SERVICE_NAME"),
    Config.withDefault("default"),
  ),
  exportUrl: pipe(
    Config.string("TELEMETRY_SPAN_PROCESSOR_URL"),
    Config.withDefault("http://telemetry:4318/v1/traces"),
  ),
});

export { NodeSdk };

export const provide =
  (
    layer: (
      evaluate: () => NodeSdk.Configuration,
    ) => Layer.Layer<never, never, Resource.Resource>,
  ) =>
  <R, E, A>(self: Effect.Effect<R, E, A>) =>
    pipe(
      Effect.config(config),
      Effect.flatMap((config) =>
        Effect.provide(
          self,
          layer(() => ({
            resource: { serviceName: config.serviceName },
            spanProcessor: new BatchSpanProcessor(
              new OTLPTraceExporter({ url: config.exportUrl }),
            ),
          })),
        ),
      ),
    );
