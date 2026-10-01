import { type ExportResult } from "@opentelemetry/core";
import type { PushMetricExporter, ResourceMetrics } from "@opentelemetry/sdk-metrics";
import type { SpanExporter, ReadableSpan } from "@opentelemetry/sdk-trace-base";
import type { LogRecordExporter, ReadableLogRecord } from "@opentelemetry/sdk-logs";
import type { Metadata } from "@grpc/grpc-js";
type SelectAggregation = NonNullable<PushMetricExporter["selectAggregation"]>;
type SelectAggregationTemporality = NonNullable<PushMetricExporter["selectAggregationTemporality"]>;
export type HeadersMap = Record<string, string>;
export declare function parseOtlpHeaders(raw: string | undefined): HeadersMap;
export declare function createGrpcMetadata(headers: HeadersMap): Metadata;
export declare function isAuthFailure(error: unknown): boolean;
export declare class DynamicHeaders {
    private readonly staticHeaders;
    private readonly helper;
    private readonly helperTimeoutMs;
    private headers;
    private version;
    private refreshPromise;
    constructor(staticHeaders: HeadersMap, helper: string | undefined, helperTimeoutMs?: number);
    current(): HeadersMap;
    currentVersion(): number;
    refresh(): Promise<number>;
    private runHelper;
}
export declare class RefreshingMetricExporter implements PushMetricExporter {
    private readonly createExporter;
    private readonly dynamicHeaders;
    private exporter;
    private headersVersion;
    constructor(createExporter: (headers: HeadersMap) => PushMetricExporter, dynamicHeaders: DynamicHeaders);
    export(metrics: ResourceMetrics, resultCallback: (result: ExportResult) => void): void;
    forceFlush(): Promise<void>;
    shutdown(): Promise<void>;
    selectAggregationTemporality(instrumentType: Parameters<SelectAggregationTemporality>[0]): ReturnType<SelectAggregationTemporality>;
    selectAggregation(instrumentType: Parameters<SelectAggregation>[0]): ReturnType<SelectAggregation>;
    _exporter(): PushMetricExporter;
    _replaceExporter(version: number): void;
    _refreshHeaders(): Promise<number>;
    _headersVersion(): number;
}
export declare class RefreshingSpanExporter implements SpanExporter {
    private readonly createExporter;
    private readonly dynamicHeaders;
    private exporter;
    private headersVersion;
    constructor(createExporter: (headers: HeadersMap) => SpanExporter, dynamicHeaders: DynamicHeaders);
    export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void;
    forceFlush(): Promise<void>;
    shutdown(): Promise<void>;
    _exporter(): SpanExporter;
    _replaceExporter(version: number): void;
    _refreshHeaders(): Promise<number>;
    _headersVersion(): number;
}
export declare class RefreshingLogExporter implements LogRecordExporter {
    private readonly createExporter;
    private readonly dynamicHeaders;
    private exporter;
    private headersVersion;
    constructor(createExporter: (headers: HeadersMap) => LogRecordExporter, dynamicHeaders: DynamicHeaders);
    export(logs: ReadableLogRecord[], resultCallback: (result: ExportResult) => void): void;
    shutdown(): Promise<void>;
    _exporter(): LogRecordExporter;
    _replaceExporter(version: number): void;
    _refreshHeaders(): Promise<number>;
    _headersVersion(): number;
}
export {};
