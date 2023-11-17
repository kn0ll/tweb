import { NodeSdk } from "@effect/opentelemetry";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Config as EffectConfig, Effect, pipe } from "effect";

export const Config = EffectConfig.all({
  serviceName: pipe(
    EffectConfig.string("TELEMETRY_RESOURCE_SERVICE_NAME"),
    EffectConfig.withDefault("default"),
  ),
  exportUrl: pipe(
    EffectConfig.string("TELEMETRY_SPAN_PROCESSOR_URL"),
    EffectConfig.withDefault("http://telemetry:4318/v1/traces"),
  ),
});

export const provide = <R, E, A>(self: Effect.Effect<R, E, A>) =>
  pipe(
    Effect.config(Config),
    Effect.flatMap((config) =>
      Effect.provide(
        self,
        NodeSdk.layer(() => ({
          resource: { serviceName: config.serviceName },
          spanProcessor: new BatchSpanProcessor(
            new OTLPTraceExporter({ url: config.exportUrl }),
          ),
        })),
      ),
    ),
  );
