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

  // Filter by Tab (Category)
  if (activeTab === 'rising') {
    query = query.eq('category', 'rising');
  } else if (activeTab === 'cooling') {
    query = query.eq('category', 'cooling');
  } else if (activeTab === 'established') {
    // For established, we might want stable trends or explicit category
    query = query.eq('category', 'established');
  }

  // Filter by Region
  if (activeRegion) {
    query = query.eq('region', activeRegion);
  }

  const { data: rawCities } = await query;

  const cities: CityTrend[] = (rawCities || []).map(city => ({
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

          <TrendTable data={cities} activeTab={activeTab} />
        </div>
      </main>

      <DataHubTeaser />
    </div>
  );
}
