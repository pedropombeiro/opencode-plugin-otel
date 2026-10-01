import type { EventOf, HandlerContext } from "../types.ts";
/** Starts an LLM span for a step and records the model/agent metadata for the request. */
export declare function handleStepStarted(e: EventOf<"session.step.started">, ctx: HandlerContext): void;
export declare function handleTextEnded(e: EventOf<"session.text.ended">, ctx: HandlerContext): void;
/** Records token/cost/cache metrics for a completed step and emits an `api_request` log. */
export declare function handleStepEnded(e: EventOf<"session.step.ended">, ctx: HandlerContext): void;
/** Records token/cost metrics for a failed step and emits an `api_error` log. */
export declare function handleStepFailed(e: EventOf<"session.step.failed">, ctx: HandlerContext): void;
