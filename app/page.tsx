import { NavBar } from "@/components/NavBar";
import { TrendTable } from "@/components/TrendTable";
import { DataHubTeaser } from "@/components/DataHubTeaser";
import { TabNavigation } from "@/components/TabNavigation";
import { supabase } from "@/lib/supabase";
import { CityTrend } from "@/lib/data";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const activeTab = (searchParams.tab as string) || 'rising';
  const activeRegion = (searchParams.region as string) || null;

  // Build Query
  let query = supabase
    .from('city_trends')
    .select('*')
    .order('rank', { ascending: true });

  // Filter logic
  let isRegionView = false;

  if (activeTab === 'rising') {
    query = query.eq('category', 'rising');
  } else if (activeTab === 'cooling') {
    query = query.eq('category', 'cooling');
  } else if (activeTab === 'established') {
    query = query.eq('category', 'established');
  } else if (activeTab === 'regions') {
    isRegionView = true;
    // Fetch ALL for aggregation
  }

  const { data: rawCities } = await query;
  let displayData: CityTrend[] = [];

  if (isRegionView && rawCities) {
    // Aggregate by Region
    const regions: Record<string, CityTrend[]> = {};

    rawCities.forEach(city => {
      if (!regions[city.region]) regions[city.region] = [];
      regions[city.region].push(city);
    });

    displayData = Object.entries(regions).map(([regionName, citiesInRegion], index) => {
      // Calculate aggregates
      const count = citiesInRegion.length;
      const avgScore = citiesInRegion.reduce((sum, c) => sum + (c.index_score || 0), 0) / count;

      // Create a composite sparkline (average of all cities)
      const firstCity = citiesInRegion[0];
      const sparklineLength = firstCity?.sparkline_data?.length || 6;

      const avgSparkline = Array.from({ length: sparklineLength }, (_, i) => {
        const sumAtPoint = citiesInRegion.reduce((sum, c) => sum + (c.sparkline_data?.[i] || 0), 0);
        return Math.round(sumAtPoint / count);
      });

      // Find top trending city for insight
      const topCity = citiesInRegion.sort((a, b) => (b.index_score || 0) - (a.index_score || 0))[0];

      return {
        rank: index + 1,
        city: regionName, // Hijack 'city' field for Region Name
        country: `${count} Active Cities`, // Hijack 'country' for Count
        trendDirection: 'stable', // Default for region unless we calc it
        category: 'established', // Use established color scheme
        region: regionName as any, // FORCE CAST to strict union type
        indexScore: Math.round(avgScore),
        sparklineData: avgSparkline,
        insight: topCity ? `Top: ${topCity.city} (${topCity.index_score})` : 'No data'
      };
    });

    // Sort regions by city count or avg score? Let's do Count then Score
    displayData.sort((a, b) => {
      const countA = parseInt(a.country);
      const countB = parseInt(b.country);
      return countB - countA || b.indexScore - a.indexScore;
    });

  } else {
    // Normal City Mapping
    displayData = (rawCities || []).map(city => ({
      rank: city.rank,
      city: city.city,
      country: city.country,
      trendDirection: city.trend_direction,
      category: city.category,
      region: city.region,
      indexScore: city.index_score,
      sparklineData: city.sparkline_data,
      insight: city.insight
    }));
  }

  // Dynamic Header Text
  let listTitle = "Rising Cities (Heatmap)";
  let listDesc = "Cities with the highest positive momentum score this month.";
  let listColor = "text-signal-coral";
  let listBorder = "border-signal-coral";

  if (activeTab === 'cooling') {
    listTitle = "Cooling Opportunities (Value)";
    listDesc = "Popular destinations seeing a dip in crowds and prices.";
    listColor = "text-deep-ocean";
    listBorder = "border-deep-ocean";
  } else if (activeTab === 'established') {
    listTitle = "Established Anchors";
    listDesc = "High-volume, low-volatility global staples.";
    listColor = "text-amber-500";
    listBorder = "border-amber-500";
  } else if (activeTab === 'regions') {
    listTitle = "Regional Analysis";
    listDesc = "Aggregated travel demand and momentum by global territory.";
    listColor = "text-electric-indigo";
    listBorder = "border-electric-indigo";
  }

  return (
    <div className="min-h-screen bg-vapor-grey flex flex-col font-sans">
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-8 pb-32">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-obsidian tracking-tight mb-2">
            Global Signal Index
          </h1>
          <p className="text-gray-500 max-w-2xl mb-6">
            Real-time tracking of travel intent, social velocity, and booking volume.
            Updated hourly.
          </p>

          {/* Tabs moved here */}
          <TabNavigation />
        </div>

        <div className="mb-12">
          <div className="mb-4">
            <h2 className={cn("text-sm font-bold uppercase tracking-wider mb-1 border-l-4 pl-3 transition-colors", listColor, listBorder)}>
              {listTitle}
            </h2>
            <p className="text-xs text-gray-500 pl-4">{listDesc}</p>
          </div>

          <TrendTable data={displayData} activeTab={activeTab} />
        </div>
      </main>

      <DataHubTeaser />
    </div>
  );
}
