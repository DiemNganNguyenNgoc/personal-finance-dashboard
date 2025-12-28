import { expect, describe, it } from '@jest/globals';
import {
    calculateProjectedReturns,
    calculateVolatilityRange
} from '../lib/finance-utils';

describe('Financial Utils', () => {
    describe('calculateProjectedReturns', () => {
        it('calculates compound interest correctly for lump sum', () => {
            const result = calculateProjectedReturns({
                initialAmount: 1000,
                annualReturnRate: 0.05,
                years: 1,
                monthlyContribution: 0
            });
            expect(result).toBeCloseTo(1051.16, 1);
        });

        it('calculates returns with monthly contributions', () => {
            const result = calculateProjectedReturns({
                initialAmount: 0,
                annualReturnRate: 0.05,
                years: 1,
                monthlyContribution: 100
            });
            expect(result).toBeGreaterThan(1200);
            expect(result).toBeLessThan(1250);
        });

        it('handles zero interest rate', () => {
            const result = calculateProjectedReturns({
                initialAmount: 1000,
                annualReturnRate: 0,
                years: 2,
                monthlyContribution: 100
            });
            expect(result).toBe(3400);
        });
    });

    describe('calculateVolatilityRange', () => {
        it('calculates range based on factor', () => {
            const result = calculateVolatilityRange(1000, 0.1);
            expect(result.min).toBe(900);
            expect(result.max).toBe(1100);
        });
    });
});
