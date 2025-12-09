import { NavBar } from "@/components/NavBar";
import { TrendTable } from "@/components/TrendTable";
import { DataHubTeaser } from "@/components/DataHubTeaser";
import { supabase } from "@/lib/supabase";
import { CityTrend } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: rawCities, error } = await supabase
    .from('city_trends')
    .select('*')
    .order('rank', { ascending: true });

  if (error) {
    console.error("Supabase Error:", error);
  }

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

          {cities.length === 0 && (
            <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg font-mono text-sm text-red-700">
              <h3 className="font-bold mb-2">⚠️ Debug: No Data Found</h3>
              <div className="space-y-1">
                <p><strong>Supabase Error:</strong> {error ? error.message : "None"}</p>
                <p><strong>Raw Data:</strong> {rawCities ? "Found" : "Null"}</p>
                <p><strong>Env Configured:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Yes" : "No"}</p>
                <p><strong>URL Used:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 20)}...</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <DataHubTeaser />
    </div>
  );
}
