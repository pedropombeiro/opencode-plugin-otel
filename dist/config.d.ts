import { type Level } from "./types.ts";
/** Accepted values for `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`. */
export type MetricsTemporality = "cumulative" | "delta" | "lowmemory";
/** Valid trace types emitted by the plugin. */
export declare const TRACE_TYPES: readonly ["session", "llm", "tool"];
/** Configuration values resolved from `OPENCODE_*` environment variables. */
export type PluginConfig = {
    enabled: boolean;
    logsEnabled: boolean;
    capturePromptInLogs: boolean;
    captureModelContext: boolean;
    logLevel: string | undefined;
    endpoint: string;
    protocol: "grpc" | "http/protobuf" | "http/json";
    metricsInterval: number;
    logsInterval: number;
    metricPrefix: string;
    otlpHeaders: string | undefined;
    otlpHeadersHelper: string | undefined;
    resourceAttributes: string | undefined;
    spanAttributes: string | undefined;
    traceparent: string | undefined;
    tracestate: string | undefined;
    metricsTemporality: MetricsTemporality | undefined;
    disabledMetrics: Set<string>;
    disabledTraces: Set<string>;
    tracePropagationProviders: Set<string>;
};
export declare function parseAttributePairs(raw: string | undefined): Record<string, string>;
/**
 * Options accepted via the OpenCode V2 plugin object form
 * (`{ "package": "opencode-plugin-otel", "options": { ... } }`). Every field is optional; a provided
 * value takes precedence over the matching `OPENCODE_*` environment variable,
 * which in turn wins over the built-in default. Field names mirror the resolved
 * {@link PluginConfig}.
 */
export type OtelPluginOptions = {
    enabled?: boolean;
    logsEnabled?: boolean;
    capturePromptInLogs?: boolean;
    captureModelContext?: boolean;
    logLevel?: string;
    endpoint?: string;
    protocol?: "grpc" | "http/protobuf" | "http/json";
    metricsInterval?: number;
    logsInterval?: number;
    metricPrefix?: string;
    otlpHeaders?: string;
    otlpHeadersHelper?: string;
    resourceAttributes?: string;
    spanAttributes?: string;
    traceparent?: string;
    tracestate?: string;
    metricsTemporality?: MetricsTemporality;
    disabledMetrics?: string[];
    disabledTraces?: string[];
    tracePropagationProviders?: string[];
};
/** Parses a positive integer from an environment variable, returning `fallback` if absent or invalid. */
export declare function parseEnvInt(key: string, fallback: number): number;
/**
 * Resolves the plugin config from plugin `options` and `OPENCODE_*` environment
 * variables. For every field a provided option wins over the environment
 * variable, which in turn wins over the built-in default.
 *
 * Copies resource attributes and metrics temporality into the corresponding
 * OTel environment variables. OTLP headers are passed directly to exporters.
 */
export declare function loadConfig(options?: OtelPluginOptions): PluginConfig;
export declare function resolveHelperPath(helper: string | undefined, directory: string | undefined, worktree: string | undefined): string | undefined;
/**
 * Resolves an opencode log level string to a `Level`.
 * Returns `current` unchanged when the input does not match a known level.
 */
export declare function resolveLogLevel(logLevel: string, current: Level): Level;
