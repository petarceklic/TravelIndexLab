import { NavBar } from "@/components/NavBar";
import { TrendTable } from "@/components/TrendTable";
import { DataHubTeaser } from "@/components/DataHubTeaser";
import { supabase } from "@/lib/supabase";
import { CityTrend } from "@/lib/data";

export default async function Home() {
  const { data: rawCities } = await supabase
    .from('city_trends')
    .select('*')
    .order('rank', { ascending: true });

  const cities: CityTrend[] = (rawCities || []).map(city => ({
    rank: city.rank,
    city: city.city,
    country: city.country,
    trendDirection: city.trend_direction,
    indexScore: city.index_score,
    sparklineData: city.sparkline_data,
    insight: city.insight
  }));

  return (
    <div className="min-h-screen bg-vapor-grey flex flex-col font-sans">
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-8 pb-32">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-obsidian tracking-tight mb-2">
            Global Signal Index
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Real-time tracking of travel intent, social velocity, and booking volume.
            Updated hourly.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-sm font-bold text-signal-coral uppercase tracking-wider mb-4 border-l-4 border-signal-coral pl-3">
            Rising Cities (Heatmap)
          </h2>
          <TrendTable data={cities} />
        </div>
      </main>

      <DataHubTeaser />
    </div>
  );
}
