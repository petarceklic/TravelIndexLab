"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    Flame,
    Snowflake,
    Anchor,
    Globe,
    Lock
} from "lucide-react";

export function NavBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentTab = searchParams.get('tab') || 'rising';
    const currentRegion = searchParams.get('region');

    const handleRegionChange = (region: string) => {
        const params = new URLSearchParams(searchParams);
        if (region) {
            params.set('region', region);
        } else {
            params.delete('region');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <nav className="border-b border-vapor-grey bg-lab-white sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                    <div className="w-8 h-8 bg-obsidian text-lab-white flex items-center justify-center font-serif font-bold rounded-sm">
                        TI
                    </div>
                    <span className="font-serif font-bold text-xl tracking-tight text-obsidian hidden sm:block">
                        TravelIndexLab
                    </span>
                </div>

                {/* Tab Bar Container */}
                <div className="flex items-center gap-1 sm:gap-6 overflow-x-auto no-scrollbar">

                    {/* Rising */}
                    <Link href="/?tab=rising" className={cn(
                        "flex items-center gap-1.5 px-3 py-5 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                        currentTab === 'rising'
                            ? "border-signal-coral text-obsidian"
                            : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
                    )}>
                        <Flame className={cn("w-4 h-4", currentTab === 'rising' ? "text-signal-coral fill-signal-coral" : "text-gray-400")} />
                        Rising
                    </Link>

                    {/* Cooling */}
                    <Link href="/?tab=cooling" className={cn(
                        "flex items-center gap-1.5 px-3 py-5 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                        currentTab === 'cooling'
                            ? "border-deep-ocean text-obsidian"
                            : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
                    )}>
                        <Snowflake className={cn("w-4 h-4", currentTab === 'cooling' ? "text-deep-ocean fill-deep-ocean" : "text-gray-400")} />
                        Cooling
                    </Link>

                    {/* Established */}
                    <Link href="/?tab=established" className={cn(
                        "flex items-center gap-1.5 px-3 py-5 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                        currentTab === 'established'
                            ? "border-amber-500 text-obsidian"
                            : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
                    )}>
                        <Anchor className={cn("w-4 h-4", currentTab === 'established' ? "text-amber-500" : "text-gray-400")} />
                        Established
                    </Link>

                    {/* Region Filter (Simple Select for specific MVP) */}
                    <div className="relative group ml-2 sm:ml-4">
                        <button className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                            currentRegion
                                ? "bg-vapor-grey border-obsidian text-obsidian"
                                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                        )}>
                            <Globe className="w-3.5 h-3.5" />
                            {currentRegion || "By Region"}
                            <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                        </button>

                        {/* Dropdown Menu (Pure CSS Hover for Simplicity) */}
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 p-1 hidden group-hover:block animate-in fade-in zoom-in-95 duration-200">
                            <div className="text-xs font-semibold text-gray-400 px-3 py-2 uppercase tracking-wider">Select Region</div>
                            {['Asia-Pacific', 'Europe', 'Americas', 'Middle East/Africa'].map(region => (
                                <div
                                    key={region}
                                    onClick={() => handleRegionChange(region)}
                                    className={cn(
                                        "px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-vapor-grey transition-colors",
                                        currentRegion === region ? "text-electric-indigo font-medium bg-indigo-50" : "text-gray-600"
                                    )}
                                >
                                    {region}
                                </div>
                            ))}
                            {currentRegion && (
                                <div
                                    onClick={() => handleRegionChange("")}
                                    className="border-t border-gray-100 mt-1 pt-1 px-3 py-2 text-xs text-red-500 cursor-pointer hover:bg-red-50 rounded-md text-center"
                                >
                                    Clear Filter
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Full Index (Upsell) */}
                    <button className="flex items-center gap-1.5 px-3 py-1.5 ml-2 sm:ml-4 text-xs font-bold text-electric-indigo bg-indigo-50 border border-indigo-100 rounded-md hover:bg-indigo-100 transition-colors">
                        <Lock className="w-3 h-3" />
                        Full Index
                    </button>
                </div>
            </div>
        </nav>
    );
}
