export function modulo(n: number, m: number): number {
    if (m === 0) return NaN;
    const mod = Math.abs(m);
    // handle negative numbers and divisors
    return ((n % mod) + mod) % mod;
}
