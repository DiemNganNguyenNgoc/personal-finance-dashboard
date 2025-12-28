export const translations = {
    en: {
        nav: {
            savings: "Savings",
            bonds: "Bonds",
            indexFunds: "Index Funds",
            crypto: "Crypto",
        },
        dashboard: {
            component: "Component",
            analysis: "Interactive risk-adjusted projections for your financial assets.",
            projectedValue: "Projected Portfolio Value",
            return: "Return",
            over: "over",
            years: "years",
            expectedYield: "Expected Yield",
            annualCompounded: "Annual compounded growth",
            riskRating: "Risk Rating",
            volatility: "Volatility",
            projectedGrowth: "Projected Portfolio Growth",
            estimatedValue: "Estimated Value",
            year: "Year",
            simulationSettings: "Simulation Settings",
            horizon: "Horizon",
            compoundingNote: "Compounding operates exponentially. A {years} year horizon significantly optimizes yield vs risk.",
            liveEngine: "Live calculation engine active",
        },
        risk: {
            low: "Low",
            medium: "Medium",
            high: "High",
            extreme: "Extreme",
        },
        assets: {
            savings: "High Yield Savings",
            bonds: "Government Bonds",
            indexFunds: "S&P 500 Index Funds",
            crypto: "Cryptocurrency Portfolio",
        }
    },
    vi: {
        nav: {
            savings: "Tiết kiệm",
            bonds: "Trái phiếu",
            indexFunds: "Quỹ chỉ số",
            crypto: "Tiền điện tử",
        },
        dashboard: {
            component: "Thành phần",
            analysis: "Dự báo điều chỉnh theo rủi ro tương tác cho tài sản tài chính của bạn.",
            projectedValue: "Giá trị danh mục dự kiến",
            return: "Lợi nhuận",
            over: "trong",
            years: "năm",
            expectedYield: "Lợi suất kỳ vọng",
            annualCompounded: "Tỷ lệ tăng trưởng kép hàng năm",
            riskRating: "Đánh giá rủi ro",
            volatility: "Biên độ dao động",
            projectedGrowth: "Tăng trưởng danh mục dự kiến",
            estimatedValue: "Giá trị ước tính",
            year: "Năm",
            simulationSettings: "Cài đặt mô phỏng",
            horizon: "Thời hạn",
            compoundingNote: "Lãi kép hoạt động theo cấp số nhân. Thời hạn {years} năm giúp tối ưu hóa đáng kể lợi suất so với rủi ro.",
            liveEngine: "Động cơ tính toán trực tiếp đang hoạt động",
        },
        risk: {
            low: "Thấp",
            medium: "Trung bình",
            high: "Cao",
            extreme: "Rất cao",
        },
        assets: {
            savings: "Tiết kiệm lãi suất cao",
            bonds: "Trái phiếu chính phủ",
            indexFunds: "Quỹ chỉ số S&P 500",
            crypto: "Danh mục tiền điện tử",
        }
    }
};

export type Language = 'en' | 'vi';
export type TranslationKey = typeof translations.en;
