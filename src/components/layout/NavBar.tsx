"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
// Ensure icons are installed or use text. I'll use text for now or import Lucide icons if available. 
// Lucide is installed by shadcn.
import { DollarSign, TrendingUp, ShieldCheck, Bitcoin } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { LanguageToggle } from "./LanguageToggle"
import { useLanguage } from "@/components/language-provider"

export function NavBar() {
    const pathname = usePathname()
    const { t } = useLanguage()

    const items = [
        { name: t.nav.savings, href: "/savings", icon: ShieldCheck },
        { name: t.nav.bonds, href: "/bonds", icon: DollarSign },
        { name: t.nav.indexFunds, href: "/index-funds", icon: TrendingUp },
        { name: t.nav.crypto, href: "/crypto", icon: Bitcoin },
    ]

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-extrabold text-2xl tracking-tighter flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground p-1 rounded">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        RiskDash
                    </Link>
                    <div className="hidden md:flex items-center space-x-1">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all hover:text-primary",
                                    pathname === item.href
                                        ? "bg-secondary text-secondary-foreground"
                                        : "text-muted-foreground hover:bg-secondary/50"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}
