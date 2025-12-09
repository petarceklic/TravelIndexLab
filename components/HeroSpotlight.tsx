"use client";

import { Flame, Info } from "lucide-react";
import { CityTrend } from "@/lib/data";

interface HeroSpotlightProps {
    activeTab: string;
    data: CityTrend[];
}

export function HeroSpotlight({ activeTab, data }: HeroSpotlightProps) {
    if (!data || data.length === 0) return null;

    let title = "";
    let message = "";
    let accentColor = "bg-gray-100 border-gray-200 text-gray-700";

    if (activeTab === 'rising') {
        const topCities = data.slice(0, 3).map(c => c.city).join(", ");
        title = "Market Velocity";
        message = `3 Cities (${topCities}) are showing exponential social growth today.`;
        accentColor = "bg-orange-50 border-orange-100 text-orange-800";
    } else if (activeTab === 'cooling') {
        title = "Value Opportunity";
        message = "Historical volume leaders are seeing a -15% crowd reduction this week.";
        accentColor = "bg-blue-50 border-blue-100 text-blue-800";
    } else if (activeTab === 'established') {
        title = "Stable Anchors";
        message = "These 5 hubs have maintained >90% booking volume retention year-over-year.";
        accentColor = "bg-amber-50 border-amber-100 text-amber-800";
    } else if (activeTab === 'regions') {
        const totalCities = data.reduce((acc, region) => acc + parseInt(region.country), 0);
        title = "Global Coverage";
        message = `Tracking ${totalCities} active signals across 4 major territories.`;
        accentColor = "bg-indigo-50 border-indigo-100 text-indigo-800";
    }

    return (
        <div className={`mb-6 p-4 rounded-xl border ${accentColor} flex items-start sm:items-center gap-3 shadow-sm`}>
            <div className="p-2 bg-white/50 rounded-full shrink-0">
                {activeTab === 'rising' ? <Flame className="w-5 h-5" /> : <Info className="w-5 h-5" />}
            </div>
            <div>
                <span className="font-bold mr-2">{title}:</span>
                <span className="opacity-90">{message}</span>
            </div>
        </div>
    );
}
