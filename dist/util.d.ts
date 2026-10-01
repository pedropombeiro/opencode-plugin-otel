import { type Context } from "@opentelemetry/api";
import { type HandlerContext, type SessionAgentType, type TracingState } from "./types.ts";
/** A structured error as emitted by the OpenCode V2 event stream. */
export type StructuredError = {
    type: string;
    message: string;
    status?: number;
};
/** Token counts as emitted by the OpenCode V2 event stream. */
export type TokenInfo = {
    input: number;
    output: number;
    reasoning: number;
    cache: {
        read: number;
        write: number;
    };
};
/** A `{ providerID, id }` model reference as emitted by the OpenCode V2 event stream. */
export type ModelRef = {
    providerID: string;
    id: string;
    variant?: string;
};
/** Returns a human-readable summary string from a structured error payload. */
export declare function errorSummary(err: StructuredError | undefined): string;
/** Returns the canonical OTel GenAI provider name, preserving unknown provider IDs. */
export declare function genAiProviderName(providerID: string): string;
/** Sums billed tokens for a usage sample, excluding cache reads/writes. */
export declare function totalTokens(tokens: TokenInfo | undefined): number;
/** Formats a model reference as `provider/id`, defaulting to `unknown`. */
export declare function modelRef(model: ModelRef | undefined): string;
/**
 * Inserts a key/value pair into `map`, evicting the oldest entry first when the map
 * has reached `MAX_PENDING` capacity to prevent unbounded memory growth.
 */
export declare function setBoundedMap<K, V>(map: Map<K, V>, key: K, value: V): void;
/** Records an event id for de-duplication, evicting the oldest entry when at capacity. */
export declare function markSeen(seen: TracingState["seenEvents"], id: string): void;
export declare function enqueueEvent(state: TracingState, id: string, handle: () => Promise<void>): Promise<void>;
/** Enqueues subscription events without blocking the reader while preserving shared dispatch order. */
export declare function consumeEvents<T extends {
    id: string;
}>(events: AsyncIterable<T>, state: TracingState, dispatch: (event: T) => Promise<void>, onError: (event: T, error: unknown) => Promise<void>): Promise<void>;
/**
 * Returns `true` if the metric name (without prefix) is not in the disabled set.
 * The `name` should be the suffix after the metric prefix, e.g. `"session.count"`.
 */
export declare function isMetricEnabled(name: string, ctx: {
    disabledMetrics: Set<string>;
}): boolean;
/**
 * Returns `true` if the trace type is not in the disabled set.
 * Valid names are `"session"`, `"llm"`, and `"tool"`.
 */
export declare function isTraceEnabled(name: string, ctx: {
    disabledTraces: Set<string>;
}): boolean;
/** Builds a consistent agent attribute set for OTLP logs, metrics, and spans. */
export declare function agentAttrs(agentName: string, agentType: SessionAgentType | "unknown"): {
    readonly agent: string;
    readonly "agent.name": string;
    readonly "agent.type": SessionAgentType | "unknown";
};
/** Resolves the trace context for a run span, falling back to the configured root context. */
export declare function resolveRunContext(sessionID: string, ctx: HandlerContext): Context;
/** Resolves the trace context for a step span, falling back to its run context. */
export declare function resolveStepContext(sessionID: string, assistantMessageID: string, ctx: HandlerContext): Context;
/** Resolves a child run under its correlated dispatch tool, falling back to the parent run. */
export declare function resolveSubagentTraceContext(sessionID: string, parentID: string, agent: string, ctx: HandlerContext): Context;
/** Resolves the current session-scoped agent name/type, defaulting to `unknown` when unavailable. */
export declare function getSessionAgentMeta(sessionID: string, ctx: HandlerContext): {
    agentName: string;
    agentType: SessionAgentType | "unknown";
};
export declare function contextForSession(sessionID: string, ctx: HandlerContext, getSession: (sessionID: string) => Promise<{
    projectID: string;
    agent?: string;
    parentID?: string;
    time: {
        created: number;
    };
}>): Promise<HandlerContext>;
