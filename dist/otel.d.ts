import { LoggerProvider } from "@opentelemetry/sdk-logs";
import { MeterProvider } from "@opentelemetry/sdk-metrics";
import { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";
import type { Instruments } from "./types.ts";
import { type MetricsTemporality } from "./config.ts";
/**
 * Builds an OTel `Resource` seeded with `service.name`, `app.version`, `os.type`, and
 * `host.arch`. Additional attributes from `OTEL_RESOURCE_ATTRIBUTES` are merged in and
 * may override the defaults.
 */
export declare function buildResource(version: string, resourceAttributes?: string | undefined): import("@opentelemetry/resources").Resource;
/** Handles returned by `setupOtel`, used for graceful shutdown. */
export type OtelProviders = {
    meterProvider: MeterProvider;
    loggerProvider: LoggerProvider;
    tracerProvider: BasicTracerProvider;
};
export declare function forceFlushOtel(providers: OtelProviders): Promise<void>;
export declare function buildHttpSignalUrl(endpoint: string, signal: "traces" | "metrics" | "logs"): string;
/**
 * Initialises the OTel SDK — creates a `MeterProvider`, `LoggerProvider`, and
 * `BasicTracerProvider` backed by OTLP exporters (gRPC or HTTP/protobuf)
 * pointed at `endpoint`, and registers them as the global providers.
 */
export declare function setupOtel(endpoint: string, protocol: "grpc" | "http/protobuf" | "http/json", metricsInterval: number, logsInterval: number, version: string, otlpHeaders?: string, otlpHeadersHelper?: string, resourceAttributes?: string, metricsTemporality?: MetricsTemporality): Promise<OtelProviders>;
/** Creates all metric instruments using the global `MeterProvider`. Metric names are prefixed with `prefix`. */
export declare function createInstruments(prefix: string): Instruments;
