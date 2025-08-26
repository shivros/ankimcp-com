import { describe, it, expect } from 'vitest';
import { modulo } from './math';

describe('modulo', () => {
    it('handles negative dividend', () => {
        expect(modulo(-1.5, 1)).toBeCloseTo(0.5);
    });
    it('handles negative divisor', () => {
        expect(modulo(5, -2)).toBe(1);
    });
});
