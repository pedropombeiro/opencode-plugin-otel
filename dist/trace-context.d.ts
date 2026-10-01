import { type Context, type SpanContext } from "@opentelemetry/api";
/** Builds a remote parent context from W3C trace-context headers. */
export declare function remoteParentContext(traceparent: string | undefined, tracestate: string | undefined): Context | undefined;
/** Injects W3C trace context derived from an explicit span context into HTTP headers. */
export declare function injectTraceContext(spanContext: SpanContext, headers: Record<string, string>): void;
