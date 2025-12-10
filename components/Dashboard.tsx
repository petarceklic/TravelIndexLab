"use client";

import { useState, useMemo } from "react";
import { NavBar } from "@/components/NavBar";
import { TrendTable } from "@/components/TrendTable";
import { HeroSpotlight } from "@/components/HeroSpotlight";
import { TabNavigation } from "@/components/TabNavigation";
import { CityTrend } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface DashboardProps {
    initialData: any[]; // Raw Supabase data
    initialTab: string;
}

export function Dashboard({ initialData, initialTab }: DashboardProps) {
    const [activeTab, setActiveTab] = useState<string>(initialTab);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        // Clear search when switching tabs (optional, but cleaner interaction)
        setSearchQuery('');
        // Shallow URL update to keep state shareable without reloading
        window.history.replaceState(null, '', `?tab=${tab}`);
    };

    // Filter Logic
    const displayData = useMemo(() => {
        // Robust Client-Side Deduplication (Handling dirty DB state)
        const uniqueData = Array.from(new Map(initialData.map(item => [item.city, item])).values());

        let filtered: CityTrend[] = [];
        const isSearchActive = searchQuery.trim().length > 0;

        if (isSearchActive) {
            const query = searchQuery.toLowerCase().trim();
            // Global Search Mode (Overrides Tab)
            filtered = uniqueData.filter(c =>
                c.city.toLowerCase().includes(query) ||
                c.country.toLowerCase().includes(query)
            ).map((city) => {
                // Standard mapping for search results
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
            return filtered.sort((a, b) => (b.indexScore || 0) - (a.indexScore || 0));
        }

        // Standard Filter (only if no search)
        let dataToFilter = uniqueData;
        let isRegionView = false;

        if (activeTab === 'regions') {
            isRegionView = true;
            // Region logic here (copied from page.tsx)
            const regions: Record<string, any[]> = {};

            uniqueData.forEach(city => {
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

        // Standard Tab Filter
        if (activeTab === 'rising') dataToFilter = uniqueData.filter(c => c.category === 'rising');
        if (activeTab === 'cooling') dataToFilter = uniqueData.filter(c => c.category === 'cooling');

        // Hidden Gems Logic: High Score (>70) but Low Visibility (Rank > 15)
        // We filter across ALL categories to find these outliers
        if (activeTab === 'hidden-gems') {
            dataToFilter = uniqueData.filter(c =>
                (c.index_score || 0) > 70 &&
                c.rank > 15
            );
        } else if (activeTab === 'established') {
            // Fallback for direct URL legacy support, though button is gone
            dataToFilter = uniqueData.filter(c => c.category === 'established');
        }


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

        return filtered.sort((a, b) => (b.indexScore || 0) - (a.indexScore || 0)); // Sort by score for gems
    }, [activeTab, initialData, searchQuery]);

    // Derived UI Strings
    let listTitle = "Rising Cities (Heatmap)";
    let listDesc = "Cities with the highest positive momentum score this month.";
    let listColor = "text-signal-emerald";
    let listBorder = "border-signal-emerald";

    if (searchQuery.trim().length > 0) {
        listTitle = `Search Results: "${searchQuery}"`;
        listDesc = `Showing global matches for "${searchQuery}".`;
        listColor = "text-obsidian";
        listBorder = "border-obsidian";
    } else if (activeTab === 'cooling') {
        listTitle = "Softening Cities (Value)";
        listDesc = "Popular destinations seeing a dip in crowds and prices. Great for value seekers.";
        listColor = "text-deep-ocean";
        listBorder = "border-deep-ocean";
    } else if (activeTab === 'hidden-gems') {
        listTitle = "Hidden Gems";
        listDesc = "High-momentum cities flying under the radar.";
        listColor = "text-purple-500";
        listBorder = "border-purple-500";
    } else if (activeTab === 'regions') {
        listTitle = "Regional Index";
        listDesc = "Aggregated travel demand and momentum by global territory.";
        listColor = "text-electric-indigo";
        listBorder = "border-electric-indigo";
    }

    return (
        <div className="mb-8">
            <div className="mb-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-obsidian tracking-tight mb-2">
                        Global Signal Index
                    </h1>
                    <p className="text-gray-500 max-w-xl">
                        Real-time tracking of travel intent, social velocity, and booking volume.
                        Updated hourly.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 relative">
                    {/* Client Side Tab Nav */}
                    <div className={cn("transition-opacity duration-200 flex-1 overflow-x-hidden", searchQuery ? "opacity-30 pointer-events-none grayscale" : "opacity-100")}>
                        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
                    </div>

                    {/* Search Input - Now on the right rail */}
                    <div className="relative w-full md:w-64 shrink-0">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Find a city..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-snug bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-obsidian focus:border-obsidian text-lg transition duration-150 ease-in-out"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-12">
                <div className={cn("mb-6 border-l-4 pl-4 transition-colors", listBorder)}>
                    <p className="text-lg text-gray-700 font-medium leading-relaxed">{listDesc}</p>
                </div>

                {/* Hide Hero Spotlight during search to save space/confusion */}
                {!searchQuery && <HeroSpotlight activeTab={activeTab} data={displayData} />}

                <TrendTable data={displayData} activeTab={activeTab} />
            </div>
        </div>
    );
}
