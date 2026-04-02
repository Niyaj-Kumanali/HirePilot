/**
 * Simulates network latency by returning a promise that resolves after a specified delay.
 * @param ms Delay in milliseconds.
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
