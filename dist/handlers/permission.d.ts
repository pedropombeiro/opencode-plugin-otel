import type { EventOf, HandlerContext } from "../types.ts";
/** Stores an answered permission prompt for correlation when the reply arrives. */
export declare function handlePermissionAsked(e: EventOf<"permission.asked">, ctx: HandlerContext): void;
/** Emits a `tool_decision` log event recording whether the permission was accepted or rejected. */
export declare function handlePermissionReplied(e: EventOf<"permission.replied">, ctx: HandlerContext): void;
