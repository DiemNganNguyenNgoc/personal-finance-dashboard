"use client"

import { useState, useMemo } from "react"
import { useLanguage } from "@/components/language-provider"
import { RiskDisplay } from "./RiskDisplay"
import { TimeHorizonInput } from "./TimeHorizonInput"
import { ReturnsChart } from "./ReturnsChart"
import { calculateProjectedReturns, calculateVolatilityRange } from "@/lib/finance-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AssetDashboardProps {
    assetName: string;
    annualReturnRate: number;
    volatility: number;
    riskLevel: "Low" | "Medium" | "High" | "Extreme";
    initialAmount?: number;
    colorTheme?: string; // e.g. "emerald", "blue", "violet", "orange"
}

export function AssetDashboard({
    assetName,
    annualReturnRate,
    volatility,
    riskLevel,
    initialAmount = 10000,
    colorTheme = "blue"
}: AssetDashboardProps) {
    const [timeHorizon, setTimeHorizon] = useState(10); // Default 10 years
    const { t } = useLanguage();

    const themeColors = useMemo(() => {
        switch (colorTheme) {
            case "emerald": return { text: "text-emerald-500", bg: "bg-emerald-500", border: "border-emerald-500/20", gradient: "from-emerald-500/20" };
            case "blue": return { text: "text-blue-500", bg: "bg-blue-500", border: "border-blue-500/20", gradient: "from-blue-500/20" };
            case "violet": return { text: "text-violet-500", bg: "bg-violet-500", border: "border-violet-500/20", gradient: "from-violet-500/20" };
            case "orange": return { text: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500/20", gradient: "from-orange-500/20" };
            default: return { text: "text-primary", bg: "bg-primary", border: "border-primary/20", gradient: "from-primary/20" };
        }
    }, [colorTheme]);

    const projectionData = useMemo(() => {
        const data = [];
        // Always start with Year 0 (initial amount) for chart
        data.push({ year: 0, value: initialAmount, min: initialAmount, max: initialAmount });

        for (let year = 1; year <= timeHorizon; year++) {
            const val = calculateProjectedReturns({
                initialAmount,
                annualReturnRate,
                years: year
            });
            const { min, max } = calculateVolatilityRange(val, volatility);
            data.push({ year, value: val, min, max });
        }
        return data;
    }, [timeHorizon, initialAmount, annualReturnRate, volatility]);

    const finalValue = projectionData[projectionData.length - 1].value;
    const roi = ((finalValue - initialAmount) / initialAmount) * 100;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="space-y-2">
                    <Badge variant="outline" className={`${themeColors.text} ${themeColors.border} bg-background/50 backdrop-blur-sm px-3 py-1`}>
                        {t.dashboard.component}
                    </Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                        {assetName}
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        {t.dashboard.analysis}
                    </p>
                </div>
                <div className={`text-right p-6 rounded-3xl border ${themeColors.border} bg-gradient-to-br ${themeColors.gradient} to-transparent backdrop-blur-md shadow-2xl`}>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t.dashboard.projectedValue}</p>
                    <p className={`text-5xl font-black ${themeColors.text} tabular-nums mt-1`}>
                        ${finalValue.toLocaleString('vi-VN')}
                    </p>
                    <div className="flex items-center justify-end gap-2 mt-2">
                        <Badge className={roi >= 0 ? "bg-green-500/20 text-green-500 border-green-500/20" : "bg-red-500/20 text-red-500 border-red-500/20"}>
                            {roi >= 0 ? "↑" : "↓"} {Math.abs(roi).toFixed(1)}% {t.dashboard.return}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{t.dashboard.over} {timeHorizon} {t.dashboard.years}</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <RiskDisplay riskLevel={riskLevel} volatility={volatility} />
                <Card className="overflow-hidden border-none shadow-lg bg-card/50 backdrop-blur-xl">
                    <div className={`h-1 w-full ${themeColors.bg}`} />
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{t.dashboard.expectedYield}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-3xl font-black ${themeColors.text}`}>{(annualReturnRate * 100).toFixed(1)}%</div>
                        <p className="text-xs text-muted-foreground mt-1">{t.dashboard.annualCompounded}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    <ReturnsChart data={projectionData} color={colorTheme} />
                </div>
                <div className="md:col-span-1">
                    <Card className="h-full border-none shadow-xl bg-card/30 backdrop-blur-2xl overflow-hidden relative">
                        <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-10 ${themeColors.bg}`} />
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <div className={`h-4 w-1 rounded-full ${themeColors.bg}`} />
                                {t.dashboard.simulationSettings}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <TimeHorizonInput value={timeHorizon} onValueChange={setTimeHorizon} color={themeColors.text} />
                            <div className="space-y-4">
                                <div className="bg-muted/50 p-4 rounded-2xl text-sm leading-relaxed border border-border/50">
                                    {t.dashboard.compoundingNote.replace("{years}", timeHorizon.toString())}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <div className="h-2 w-2 rounded-full animate-pulse bg-green-500" />
                                    {t.dashboard.liveEngine}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
