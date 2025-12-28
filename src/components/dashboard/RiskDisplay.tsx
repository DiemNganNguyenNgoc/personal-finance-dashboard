"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RiskDisplayProps {
    riskLevel: "Low" | "Medium" | "High" | "Extreme";
    volatility: number;
}

import { ShieldAlert, ShieldCheck, Zap, AlertTriangle } from "lucide-react"

const getRiskConfig = (level: string) => {
    switch (level) {
        case "Low": return {
            color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/20",
            bar: "bg-emerald-500",
            icon: ShieldCheck
        };
        case "Medium": return {
            color: "bg-blue-500/20 text-blue-500 border-blue-500/20",
            bar: "bg-blue-500",
            icon: ShieldAlert
        };
        case "High": return {
            color: "bg-orange-500/20 text-orange-500 border-orange-500/20",
            bar: "bg-orange-500",
            icon: AlertTriangle
        };
        case "Extreme": return {
            color: "bg-red-500/20 text-red-500 border-red-500/20",
            bar: "bg-red-500",
            icon: Zap
        };
        default: return {
            color: "bg-slate-500/20 text-slate-500 border-slate-500/20",
            bar: "bg-slate-500",
            icon: ShieldCheck
        };
    }
}

export function RiskDisplay({ riskLevel, volatility }: RiskDisplayProps) {
    const { t } = useLanguage();
    const config = getRiskConfig(riskLevel);
    const Icon = config.icon;

    const translatedLevel = {
        "Low": t.risk.low,
        "Medium": t.risk.medium,
        "High": t.risk.high,
        "Extreme": t.risk.extreme,
    }[riskLevel];

    return (
        <Card className="w-full border-none shadow-lg bg-card/50 backdrop-blur-xl overflow-hidden relative">
            <div className={`absolute right-0 top-0 h-24 w-24 opacity-[0.03] -mr-8 -mt-8`}>
                <Icon size={96} />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{t.dashboard.riskRating}</CardTitle>
                <Badge className={`${config.color} font-bold`}>{translatedLevel}</Badge>
            </CardHeader>
            <CardContent>
                <div className="flex items-end gap-2">
                    <div className="text-3xl font-black">{(volatility * 100).toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground mb-1.5 font-medium italic">{t.dashboard.volatility}</div>
                </div>
                <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                        className={`h-full ${config.bar} transition-all duration-1000 ease-out`}
                        style={{ width: `${Math.min(volatility * 100, 100)}%` }}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
