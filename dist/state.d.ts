import type { PluginConfig } from "./config.ts";
import type { SharedOtel, TracingState } from "./types.ts";
export declare function configKey(config: PluginConfig): string;
/** Schedules exporter flushes outside event dispatch and drains them during cleanup. */
export declare function createFlushScheduler(flush: () => Promise<void>): {
    request(): void;
    drain(): Promise<void>;
};
/**
 * Returns the process-wide shared OTel SDK instance, creating it on first use.
 * OpenCode may load one plugin instance per location, but `setGlobalMeterProvider`
 * and friends may only be effectively registered once per process, so providers are
 * shared and reference-counted rather than recreated per instance.
 */
export declare function acquireSharedOtel(config: PluginConfig, version: string): Promise<SharedOtel>;
/**
 * Flushes shared telemetry and releases one reference. The providers are never
 * shut down: doing so poisons the OTel global registry for the rest of the
 * process and would silently drop telemetry from later plugin instances.
 */
export declare function releaseSharedOtel(): Promise<void>;
/** Flushes shared telemetry without releasing a reference (best-effort, e.g. on process exit). */
export declare function flushSharedOtel(): Promise<void>;
/** Returns the process-wide tracing correlation state, creating it on first use. */
export declare function acquireTracingState(): TracingState;
