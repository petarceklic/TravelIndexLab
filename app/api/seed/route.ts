import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { mockCities } from '@/lib/data';

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    /* Debug Logging */
    console.log("Supabase URL:", supabaseUrl);
    console.log("Supabase Key Length:", supabaseKey ? supabaseKey.length : 0);

    try {
        // 1. Clear existing data (optional, but good for idempotency if policy allows delete)
        // await supabase.from('city_trends').delete().neq('id', 0); 

        // 2. Map mock data to snake_case column names
        const rows = mockCities.map(city => ({
            rank: city.rank,
            city: city.city,
            country: city.country,
            trend_direction: city.trendDirection,
            category: city.category,
            region: city.region,
            index_score: city.indexScore,
            sparkline_data: city.sparklineData,
            insight: city.insight
        }));

        // 3. Insert
        const { data, error } = await supabase.from('city_trends').insert(rows).select();

        if (error) throw error;

        return NextResponse.json({ success: true, count: data.length, message: "Database seeded successfully!" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
