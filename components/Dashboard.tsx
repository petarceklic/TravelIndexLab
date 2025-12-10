"use client";

import { useState, useMemo } from "react";
import { NavBar } from "@/components/NavBar";
import { TrendTable } from "@/components/TrendTable";
import { HeroSpotlight } from "@/components/HeroSpotlight";
import { TabNavigation } from "@/components/TabNavigation";
import { CityTrend } from "@/lib/data";
import { cn } from "@/lib/utils";

interface DashboardProps {
    initialData: any[]; // Raw Supabase data
    initialTab: string;
}

export function Dashboard({ initialData, initialTab }: DashboardProps) {
    const [activeTab, setActiveTab] = useState<string>(initialTab);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        // Shallow URL update to keep state shareable without reloading
        window.history.replaceState(null, '', `?tab=${tab}`);
    };

    // Filter Logic
    const displayData = useMemo(() => {
        let filtered: CityTrend[] = [];
        let isRegionView = false;

        let dataToFilter = initialData;

        if (activeTab === 'regions') {
            isRegionView = true;
            // Region logic here (copied from page.tsx)
            const regions: Record<string, any[]> = {};

            initialData.forEach(city => {
                if (!city.region) return;
                if (!regions[city.region]) regions[city.region] = [];
                regions[city.region].push(city);
            });

            filtered = Object.entries(regions).map(([regionName, citiesInRegion], index) => {
                const count = citiesInRegion.length;
                const avgScore = citiesInRegion.reduce((sum, c) => sum + (c.index_score || 0), 0) / count;

                // Composite sparkline
                const firstCity = citiesInRegion[0];
                const sparklineLength = firstCity?.sparkline_data?.length || 6;
                const avgSparkline = Array.from({ length: sparklineLength }, (_, i) => {
                    const sumAtPoint = citiesInRegion.reduce((sum, c) => sum + (c.sparkline_data?.[i] || 0), 0);
                    return Math.round(sumAtPoint / count);
                });

                const topCity = citiesInRegion.sort((a, b) => (b.index_score || 0) - (a.index_score || 0))[0];

                // Region Randoms
                const moveType = Math.random() > 0.6 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable';
                const moveValue = moveType === 'stable' ? 0 : Math.floor(Math.random() * 10) + 1;

                return {
                    rank: index + 1,
                    city: regionName,
                    country: `${count} Active Cities`,
                    trendDirection: 'regions', // Explicit for styling
                    category: 'established',
                    region: regionName as any,
                    indexScore: Math.round(avgScore),
                    sparklineData: avgSparkline,
                    insight: topCity ? `Top: ${topCity.city} (${topCity.index_score})` : 'No data',
                    rankMovement: moveType as any,
                    rankMovementValue: moveValue
                };
            });

            // Sort Regions
            filtered.sort((a, b) => {
                const countA = parseInt(a.country);
                const countB = parseInt(b.country);
                return countB - countA || b.indexScore - a.indexScore;
            });

            return filtered;
        }

        // Standard Filter
        if (activeTab === 'rising') dataToFilter = initialData.filter(c => c.category === 'rising');
        if (activeTab === 'cooling') dataToFilter = initialData.filter(c => c.category === 'cooling');
        if (activeTab === 'established') dataToFilter = initialData.filter(c => c.category === 'established');

        // Map to CityTrend
        filtered = dataToFilter.map((city) => {
            const moveType = Math.random() > 0.7 ? 'up' : Math.random() > 0.4 ? 'down' : 'stable';
            const moveValue = moveType === 'stable' ? 0 : Math.floor(Math.random() * 10) + 1;

            return {
                rank: city.rank,
                city: city.city,
                country: city.country,
                trendDirection: city.trend_direction,
                category: city.category,
                region: city.region,
                indexScore: city.index_score,
                sparklineData: city.sparkline_data,
                insight: city.insight,
                rankMovement: moveType as any,
                rankMovementValue: moveValue
            };
        });

        return filtered.sort((a, b) => a.rank - b.rank);
    }, [activeTab, initialData]);

    // Derived UI Strings
    let listTitle = "Rising Cities (Heatmap)";
    let listDesc = "Cities with the highest positive momentum score this month.";
    let listColor = "text-signal-emerald";
    let listBorder = "border-signal-emerald";

    if (activeTab === 'cooling') {
        listTitle = "Softening Cities (Value)";
        listDesc = "Popular destinations seeing a dip in crowds and prices. Great for value seekers.";
        listColor = "text-deep-ocean";
        listBorder = "border-deep-ocean";
    } else if (activeTab === 'established') {
        listTitle = "Classic Cities";
        listDesc = "High-volume, low-volatility global staples.";
        listColor = "text-slate-500";
        listBorder = "border-slate-500";
    } else if (activeTab === 'regions') {
        listTitle = "Regional Index";
        listDesc = "Aggregated travel demand and momentum by global territory.";
        listColor = "text-electric-indigo";
        listBorder = "border-electric-indigo";
    }

    return (
        <div className="mb-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-obsidian tracking-tight mb-2">
                    Global Signal Index
                </h1>
                <p className="text-gray-500 max-w-2xl mb-6">
                    Real-time tracking of travel intent, social velocity, and booking volume.
                    Updated hourly.
                </p>

                {/* Client Side Tab Nav */}
                <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
            </div>

            <div className="mb-12">
                <div className={cn("mb-6 border-l-4 pl-4 transition-colors", listBorder)}>
                    <p className="text-lg text-gray-700 font-medium leading-relaxed">{listDesc}</p>
                </div>

                {/* Hero Spotlight */}
                <HeroSpotlight activeTab={activeTab} data={displayData} />

                <TrendTable data={displayData} activeTab={activeTab} />
            </div>
        </div>
    );
}
