import { setup } from "./plugin.ts";
/**
 * OpenCode V2 plugin definition. Exported as the package default so OpenCode V2
 * discovers it via its `id` and `setup` function. Requires OpenCode `>=2`.
 */
declare const plugin: {
    id: string;
    setup: typeof setup;
};
export default plugin;
