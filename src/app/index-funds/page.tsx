import { AssetDashboard } from "@/components/dashboard/AssetDashboard"

export default function IndexFundsPage() {
    return (
        <AssetDashboard
            assetName="S&P 500 Index Funds"
            annualReturnRate={0.10}
            volatility={0.15}
            riskLevel="Medium"
            initialAmount={10000}
            colorTheme="violet"
        />
    )
}
