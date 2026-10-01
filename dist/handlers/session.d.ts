import type { EventOf, HandlerContext, SessionTotals } from "../types.ts";
export declare function handlePromptEnqueued(e: EventOf<"session.inbox.enqueued">, ctx: HandlerContext, capturePrompt: boolean): void;
/**
 * Ensures session totals exist for a session id. OpenCode does not replay durable
 * events, so a session created before the plugin subscribed (for example a
 * pre-existing session resumed with `opencode run`) never emits `session.created`;
 * the first event we observe for it initializes and counts the session lazily.
 */
export declare function ensureSession(sessionID: string, at: number, ctx: HandlerContext): SessionTotals;
/** Increments the session counter, records totals, and emits a `session.created` log event. */
export declare function handleSessionCreated(e: EventOf<"session.created">, ctx: HandlerContext): void;
export declare function handleAgentSelected(e: EventOf<"session.agent.selected">, ctx: HandlerContext): void;
/** Starts the root run span for a single execution (user turn), keyed by session id. */
export declare function handleExecutionStarted(e: EventOf<"session.execution.started">, ctx: HandlerContext): void;
/** Terminal execution events that end the root run span. */
export type ExecutionOutcome = {
    type: "succeeded";
} | {
    type: "failed";
    error: {
        type: string;
        message: string;
        status?: number;
    };
} | {
    type: "interrupted";
    reason: string;
};
/**
 * Ends the root run span for an execution with the given outcome and emits a
 * `session.error` log event when the execution failed.
 */
export declare function handleExecutionEnded(e: EventOf<"session.execution.succeeded"> | EventOf<"session.execution.failed"> | EventOf<"session.execution.interrupted">, ctx: HandlerContext, outcome: ExecutionOutcome): void;
/** Handles `session.status` idle and retry diagnostics. */
export declare function handleSessionStatus(e: EventOf<"session.status">, ctx: HandlerContext): void;
export declare function handleRetryScheduled(e: EventOf<"session.retry.scheduled">, ctx: HandlerContext): void;
/** Handles the deprecated `session.idle` event as an idle finalization signal. */
export declare function handleSessionIdle(e: EventOf<"session.idle">, ctx: HandlerContext): void;
/**
 * Updates the running session totals from the authoritative cumulative usage
 * sample emitted by opencode after each step.
 */
export declare function handleUsageUpdated(e: EventOf<"session.usage.updated">, ctx: HandlerContext): void;
/**
 * Records session duration and total token/cost histograms and emits a
 * `session.idle` log, then clears per-session state. No-ops when the session
 * totals were already finalized, so a status-idle followed by a deprecated
 * idle event does not double count.
 */
export declare function finalizeSession(sessionID: string, ctx: HandlerContext): void;
