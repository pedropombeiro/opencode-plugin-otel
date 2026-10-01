import type { EventOf, HandlerContext } from "../types.ts";
/** Records the tool name for correlation with its execution and terminal events. */
export declare function handleToolInputStarted(e: EventOf<"session.tool.input.started">, ctx: HandlerContext): void;
/** Starts timing and tracing an observed tool call, and retains the command for commit detection. */
export declare function handleToolCalled(e: EventOf<"session.tool.called">, ctx: HandlerContext): void;
export declare function handleToolProgress(e: EventOf<"session.tool.progress">, ctx: HandlerContext): void;
/** Ends a successful tool call: records duration, sets output attributes, and emits `tool_result`. */
export declare function handleToolSuccess(e: EventOf<"session.tool.success">, ctx: HandlerContext): void;
/** Ends a failed tool call: records duration, sets error attributes, and emits `tool_result`. */
export declare function handleToolFailed(e: EventOf<"session.tool.failed">, ctx: HandlerContext): void;
