import { NavBar } from "@/components/NavBar";
import { TrendTable } from "@/components/TrendTable";
import { DataHubTeaser } from "@/components/DataHubTeaser";
import { TabNavigation } from "@/components/TabNavigation";
import { HeroSpotlight } from "@/components/HeroSpotlight";
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
    const regions: Record<string, any[]> = {};

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
  let listColor = "text-signal-emerald";
  let listBorder = "border-signal-emerald";

  if (activeTab === 'cooling') {
    listTitle = "Cooling Opportunities (Value)";
    listDesc = "Popular destinations seeing a dip in crowds and prices.";
    listColor = "text-signal-coral";
    listBorder = "border-signal-coral";
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
          <div className={cn("mb-6 border-l-4 pl-4 transition-colors", listBorder)}>
            <p className="text-lg text-gray-700 font-medium leading-relaxed">{listDesc}</p>
          </div>

          {/* Hero Spotlight */}
          <HeroSpotlight activeTab={activeTab} data={displayData} />

          <TrendTable data={displayData} activeTab={activeTab} />
        </div>
      </main>

      <DataHubTeaser />
    </div>
  );
}
