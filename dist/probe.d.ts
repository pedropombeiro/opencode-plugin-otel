/** Result of a TCP connectivity probe against the OTLP endpoint. */
export type ProbeResult = {
    ok: boolean;
    ms: number;
    error?: string;
};
/**
 * Opens a TCP connection to the host and port parsed from `endpoint` to verify
 * reachability before the OTel SDK initialises. Resolves within 5 seconds.
 */
export declare function parseEndpoint(endpoint: string): {
    host: string;
    port: number;
} | null;
export declare function probeEndpoint(endpoint: string): Promise<ProbeResult>;
