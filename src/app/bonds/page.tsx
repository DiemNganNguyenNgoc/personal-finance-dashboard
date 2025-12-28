import { AssetDashboard } from "@/components/dashboard/AssetDashboard"

export default function BondsPage() {
    return (
        <AssetDashboard
            assetName="Government Bonds"
            annualReturnRate={0.055}
            volatility={0.05}
            riskLevel="Low"
            initialAmount={15000}
            colorTheme="blue"
        />
    )
}
