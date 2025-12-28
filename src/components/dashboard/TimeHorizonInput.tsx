"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

import { useLanguage } from "@/components/language-provider"

interface TimeHorizonInputProps {
    value: number;
    onValueChange: (value: number) => void;
    max?: number;
    color?: string;
}

export function TimeHorizonInput({ value, onValueChange, max = 30, color = "text-primary" }: TimeHorizonInputProps) {
    const { t } = useLanguage()
    return (
        <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="time-horizon" className="text-base font-bold uppercase tracking-tight text-muted-foreground">{t.dashboard.horizon}</Label>
                <span className={`text-2xl font-black ${color}`}>{value} {t.dashboard.years}</span>
            </div>
            <Slider
                id="time-horizon"
                min={1}
                max={max}
                step={1}
                value={[value]}
                onValueChange={(vals) => onValueChange(vals[0])}
                className="cursor-pointer py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 {t.dashboard.year}</span>
                <span>{max} {t.dashboard.years}</span>
            </div>
        </div>
    )
}
