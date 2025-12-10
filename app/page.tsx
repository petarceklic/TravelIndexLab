import { NavBar } from "@/components/NavBar";
import { DataHubTeaser } from "@/components/DataHubTeaser";
import { Dashboard } from "@/components/Dashboard";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  let rawTab = searchParams.tab;
  if (Array.isArray(rawTab)) rawTab = rawTab[0];
  const initialTab = (rawTab?.trim() || 'rising');

  // Fetch ALL raw data (no server-side filtering)
  const { data: rawCities, error } = await supabase
    .from('city_trends')
    .select('*')
    .order('rank', { ascending: true });

  if (error || !rawCities) {
    console.error("Supabase Error:", error);
    return <div className="p-8">Error loading data.</div>;
  }

  return (
    <div className="min-h-screen bg-vapor-grey flex flex-col font-sans">
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-8 pb-32">
        <Dashboard initialData={rawCities} initialTab={initialTab} />
      </main>

      <DataHubTeaser />
    </div>
  );
}
