"use client"

import { useLanguage } from "@/components/language-provider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReturnsChartProps {
    data: Array<{
        year: number;
        value: number;
        min: number;
        max: number;
    }>;
    color?: string;
}

const getChartColors = (color?: string) => {
    switch (color) {
        case "emerald": return { stroke: "#10b981", fill: "#10b981" };
        case "blue": return { stroke: "#3b82f6", fill: "#3b82f6" };
        case "violet": return { stroke: "#8b5cf6", fill: "#8b5cf6" };
        case "orange": return { stroke: "#f97316", fill: "#f97316" };
        default: return { stroke: "hsl(var(--primary))", fill: "hsl(var(--primary))" };
    }
}

export function ReturnsChart({ data, color }: ReturnsChartProps) {
    const { t } = useLanguage();
    const chartColor = getChartColors(color);

    return (
        <Card className="w-full border-none shadow-xl bg-card/50 backdrop-blur-xl overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    {t.dashboard.projectedGrowth}
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[450px] w-full pb-8 pr-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColor.fill} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={chartColor.fill} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                        <XAxis
                            dataKey="year"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            padding={{ left: 10, right: 10 }}
                            tickFormatter={(value) => `${t.dashboard.year} ${value}`}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            formatter={(value: any) => [`$${value?.toLocaleString()}`, t.dashboard.estimatedValue]}
                            labelFormatter={(label) => `${t.dashboard.year} ${label}`}
                            contentStyle={{
                                backgroundColor: 'rgba(var(--background), 0.8)',
                                backdropFilter: 'blur(16px)',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: '16px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                padding: '12px'
                            }}
                        />
                        {/* Range visualization could be improved with custom shapes but simplistic for now: 
                Dashed lines for volatility bounds, filled area for main projection */}
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={chartColor.stroke}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            animationDuration={1500}
                        />
                        <Line
                            type="monotone"
                            dataKey="min"
                            stroke="hsl(var(--muted-foreground))"
                            strokeDasharray="5 5"
                            strokeWidth={1.5}
                            dot={false}
                            activeDot={false}
                            opacity={0.4}
                        />
                        <Line
                            type="monotone"
                            dataKey="max"
                            stroke="hsl(var(--muted-foreground))"
                            strokeDasharray="5 5"
                            strokeWidth={1.5}
                            dot={false}
                            activeDot={false}
                            opacity={0.4}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
