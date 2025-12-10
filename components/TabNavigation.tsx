"use client";

import { cn } from "@/lib/utils";
import {
    Flame,
    TrendingDown,
    Landmark,
    Globe,
    Lock
} from "lucide-react";

interface TabNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {

    return (
        <div className="flex items-center gap-1 sm:gap-6 overflow-x-auto no-scrollbar py-2">

            {/* Rising */}
            <button
                onClick={() => onTabChange('rising')}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 text-lg font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer",
                    activeTab === 'rising'
                        ? "border-signal-emerald text-obsidian"
                        : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
                )}>
                <Flame className={cn("w-5 h-5", activeTab === 'rising' ? "text-signal-emerald fill-signal-emerald" : "text-gray-400")} />
                Rising Cities
            </button>

            {/* Softening (was Cooling) */}
            <button
                onClick={() => onTabChange('cooling')}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 text-lg font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer",
                    activeTab === 'cooling'
                        ? "border-deep-ocean text-obsidian"
                        : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
                )}>
                <TrendingDown className={cn("w-5 h-5", activeTab === 'cooling' ? "text-deep-ocean" : "text-gray-400")} />
                Softening Cities
            </button>

            {/* Classic (was Established) */}
            <button
                onClick={() => onTabChange('established')}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 text-lg font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer",
                    activeTab === 'established'
                        ? "border-slate-500 text-obsidian"
                        : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
                )}>
                <Landmark className={cn("w-5 h-5", activeTab === 'established' ? "text-slate-500" : "text-gray-400")} />
                Classic Cities
            </button>

            {/* Regional Index */}
            <button
                onClick={() => onTabChange('regions')}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 text-lg font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer",
                    activeTab === 'regions'
                        ? "border-electric-indigo text-electric-indigo"
                        : "border-transparent text-gray-500 hover:text-obsidian hover:border-gray-200"
                )}>
                <Globe className={cn("w-5 h-5", activeTab === 'regions' ? "text-electric-indigo" : "text-gray-400")} />
                Regional Index
                Regional Index
            </button>
        </div>
    );
}
