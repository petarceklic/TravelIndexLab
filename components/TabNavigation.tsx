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
                "flex items-center gap-2 px-3 py-2 text-lg font-medium border-b-2 transition-all whitespace-nowrap",
                currentTab === 'rising'
                    ? "border-signal-coral text-obsidian"
                    : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
            )}>
                <Flame className={cn("w-5 h-5", currentTab === 'rising' ? "text-signal-coral fill-signal-coral" : "text-gray-400")} />
                Rising Cities
            </Link>

            {/* Cooling */}
            <Link href="/?tab=cooling" className={cn(
                "flex items-center gap-2 px-3 py-2 text-lg font-medium border-b-2 transition-all whitespace-nowrap",
                currentTab === 'cooling'
                    ? "border-deep-ocean text-obsidian"
                    : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
            )}>
                <Snowflake className={cn("w-5 h-5", currentTab === 'cooling' ? "text-deep-ocean fill-deep-ocean" : "text-gray-400")} />
                Cooling Cities
            </Link>

            {/* Established */}
            <Link href="/?tab=established" className={cn(
                "flex items-center gap-2 px-3 py-2 text-lg font-medium border-b-2 transition-all whitespace-nowrap",
                currentTab === 'established'
                    ? "border-amber-500 text-obsidian"
                    : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
            )}>
                <Anchor className={cn("w-5 h-5", currentTab === 'established' ? "text-amber-500" : "text-gray-400")} />
                Established Cities
            </Link>

            {/* By Region (Aggregated View) */}
            <Link href="/?tab=regions" className={cn(
                "flex items-center gap-2 px-3 py-2 text-lg font-medium border-b-2 transition-all whitespace-nowrap",
                currentTab === 'regions'
                    ? "border-electric-indigo text-electric-indigo"
                    : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
            )}>
                <Globe className={cn("w-5 h-5", currentTab === 'regions' ? "text-electric-indigo" : "text-gray-400")} />
                By Region
            </Link>

            {/* Full Index (Upsell) */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 ml-auto sm:ml-4 text-xs font-bold text-electric-indigo bg-indigo-50 border border-indigo-100 rounded-md hover:bg-indigo-100 transition-colors whitespace-nowrap">
                <Lock className="w-3 h-3" />
                Full Index
            </button>
        </div>
    );
}
