import { AssetDashboard } from "@/components/dashboard/AssetDashboard"

export default function CryptoPage() {
    return (
        <AssetDashboard
            assetName="Cryptocurrency Portfolio"
            annualReturnRate={0.25} // Volatile asset example
            volatility={0.65}
            riskLevel="Extreme"
            initialAmount={5000}
            colorTheme="orange"
        />
    )
}
