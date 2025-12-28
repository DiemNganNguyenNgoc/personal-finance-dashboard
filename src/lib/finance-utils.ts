export interface FinancialProjectionInput {
    initialAmount: number;
    annualReturnRate: number; // e.g. 0.05 for 5%
    years: number;
    monthlyContribution?: number;
}

export const calculateProjectedReturns = ({
    initialAmount,
    annualReturnRate,
    years,
    monthlyContribution = 0,
}: FinancialProjectionInput): number => {
    // Compound interest with monthly contributions
    // Formula: FV = P * (1 + r/n)^(nt) + PMT * (((1 + r/n)^(nt) - 1) / (r/n))
    // Here we assume monthly compounding (n=12)

    if (annualReturnRate === 0) {
        return Number((initialAmount + monthlyContribution * years * 12).toFixed(2));
    }

    const r = annualReturnRate / 12;
    const n = years * 12;

    const futureValueInitial = initialAmount * Math.pow(1 + r, n);
    const futureValueContributions = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);

    return Number((futureValueInitial + futureValueContributions).toFixed(2));
};

export const calculateVolatilityRange = (projectedValue: number, volatilityFactor: number): { min: number, max: number } => {
    // Simple volatility simulation: +/- factor percentage
    return {
        min: Number((projectedValue * (1 - volatilityFactor)).toFixed(2)),
        max: Number((projectedValue * (1 + volatilityFactor)).toFixed(2))
    };
};
