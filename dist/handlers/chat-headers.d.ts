import { type Span } from "@opentelemetry/api";
import type { HandlerContext } from "../types.ts";
/** The `session.hook("model.request", ...)` event shape consumed by this handler. */
export type ModelRequestEvent = {
    sessionID: string;
    agent: string;
    model: {
        providerID: string;
        id: string;
    };
    kind: string;
    headers: Record<string, string>;
};
type ModelVisibleContextEvent = {
    sessionID: string;
    agent: string;
    model: {
        providerID: string;
        id: string;
    };
    system: readonly unknown[];
    messages: readonly {
        role: string;
        content: readonly unknown[];
    }[];
};
/** Stores a bounded text-only preview of the primary model-visible request. */
export declare function captureModelContext(event: ModelVisibleContextEvent, ctx: HandlerContext): void;
/** Applies a matching captured request preview to its LLM span. */
export declare function applyModelContext(sessionID: string, agent: string, model: {
    providerID: string;
    id: string;
}, span: Span, ctx: HandlerContext, retain?: boolean): void;
/** Injects the active LLM span's W3C trace context into outbound model requests. */
export declare function handleModelRequest(event: ModelRequestEvent, ctx: HandlerContext): Promise<void>;
export {};
