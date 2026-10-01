import { type OpenCodeContext } from "./types.ts";
/**
 * OpenCode V2 plugin entrypoint. Sets up the OTel SDK, subscribes to the granular
 * V2 event stream (`session.*`), and emits spans, metrics, and log events mirroring
 * the Claude Code monitoring signals. All instrumentation is gated on
 * `OPENCODE_ENABLE_TELEMETRY` (or the `enabled` plugin option).
 */
export declare function setup(ctx: OpenCodeContext): Promise<() => Promise<void>>;
