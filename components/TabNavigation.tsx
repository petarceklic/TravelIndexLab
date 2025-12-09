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

export function TabNavigation() {
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab') || 'rising';

    return (
        <div className="flex items-center gap-1 sm:gap-6 overflow-x-auto no-scrollbar py-2">

            {/* Rising */}
            <Link href="/?tab=rising" className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                currentTab === 'rising'
                    ? "border-signal-coral text-obsidian"
                    : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
            )}>
                <Flame className={cn("w-4 h-4", currentTab === 'rising' ? "text-signal-coral fill-signal-coral" : "text-gray-400")} />
                Rising
            </Link>

            {/* Cooling */}
            <Link href="/?tab=cooling" className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                currentTab === 'cooling'
                    ? "border-deep-ocean text-obsidian"
                    : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
            )}>
                <Snowflake className={cn("w-4 h-4", currentTab === 'cooling' ? "text-deep-ocean fill-deep-ocean" : "text-gray-400")} />
                Cooling
            </Link>

            {/* Established */}
            <Link href="/?tab=established" className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                currentTab === 'established'
                    ? "border-amber-500 text-obsidian"
                    : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
            )}>
                <Anchor className={cn("w-4 h-4", currentTab === 'established' ? "text-amber-500" : "text-gray-400")} />
                Established
            </Link>

            <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block"></div>

            {/* Regions Flattened */}
            {['Europe', 'Asia-Pacific', 'Americas', 'Middle East/Africa'].map(region => (
                <Link
                    key={region}
                    href={`/?tab=${region}`} // Treat region as a tab
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                        currentTab === region
                            ? "border-electric-indigo text-electric-indigo"
                            : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
                    )}
                >
                    {region === 'Middle East/Africa' ? 'ME/Africa' : region}
                </Link>
            ))}

            {/* Full Index (Upsell) */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 ml-auto sm:ml-4 text-xs font-bold text-electric-indigo bg-indigo-50 border border-indigo-100 rounded-md hover:bg-indigo-100 transition-colors whitespace-nowrap">
                <Lock className="w-3 h-3" />
                Full Index
            </button>
        </div>
    );
}
