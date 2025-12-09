import { NavBar } from "@/components/NavBar";
import { TrendTable } from "@/components/TrendTable";
import { DataHubTeaser } from "@/components/DataHubTeaser";
import { mockCities } from "@/lib/data";

export default function Home() {
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
          <TrendTable data={mockCities} />
        </div>
      </main>

      <DataHubTeaser />
    </div>
  );
}
