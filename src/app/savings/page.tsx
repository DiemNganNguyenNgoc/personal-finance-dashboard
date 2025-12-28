"use client"

import { AssetDashboard } from "@/components/dashboard/AssetDashboard"
import { useLanguage } from "@/components/language-provider"

export default function SavingsPage() {
    const { t } = useLanguage()
    return (
        <AssetDashboard
            assetName={t.assets.savings}
            annualReturnRate={0.045}
            volatility={0.005} // Very stable
            riskLevel="Low"
            initialAmount={25000}
            colorTheme="emerald"
        />
    )
}
