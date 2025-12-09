
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const cities = [
    // RISING (35)
    { city: "Tirana", country: "Albania", region: "Europe", category: "rising", trend: "rising", score: 98, spark: [20, 35, 45, 60, 85, 98], insight: "Digital Nomad influx +400%" },
    { city: "Medellín", country: "Colombia", region: "Americas", category: "rising", trend: "rising", score: 96, spark: [40, 45, 55, 65, 80, 96], insight: "Tech hub expansion" },
    { city: "Cape Town", country: "South Africa", region: "Middle East/Africa", category: "rising", trend: "rising", score: 94, spark: [50, 60, 65, 70, 82, 94], insight: "Summer season kickoff" },
    { city: "Seoul", country: "South Korea", region: "Asia-Pacific", category: "rising", trend: "rising", score: 93, spark: [60, 65, 72, 78, 85, 93], insight: "K-Culture tourism peak" },
    { city: "Tbilisi", country: "Georgia", region: "Europe", category: "rising", trend: "rising", score: 91, spark: [30, 40, 50, 65, 75, 91], insight: "New direct flights added" },
    { city: "Hanoi", country: "Vietnam", region: "Asia-Pacific", category: "rising", trend: "rising", score: 89, spark: [40, 50, 60, 70, 78, 89], insight: "Budget travel favorite" },
    { city: "Marrakech", country: "Morocco", region: "Middle East/Africa", category: "rising", trend: "rising", score: 88, spark: [55, 60, 68, 72, 75, 88], insight: "Spring festival buzz" },
    { city: "Almaty", country: "Kazakhstan", region: "Asia-Pacific", category: "rising", trend: "rising", score: 87, spark: [20, 30, 45, 60, 75, 87], insight: "Emerging silk road hub" },
    { city: "Buenos Aires", country: "Argentina", region: "Americas", category: "rising", trend: "rising", score: 86, spark: [50, 55, 60, 70, 80, 86], insight: "Affordable luxury boom" },
    { city: "Kigali", country: "Rwanda", region: "Middle East/Africa", category: "rising", trend: "rising", score: 85, spark: [30, 35, 40, 55, 70, 85], insight: "Green city initiatives" },
    { city: "Ljubljana", country: "Slovenia", region: "Europe", category: "rising", trend: "rising", score: 84, spark: [45, 50, 60, 70, 78, 84], insight: "Sustainable travel award" },
    { city: "Fukuoka", country: "Japan", region: "Asia-Pacific", category: "rising", trend: "rising", score: 83, spark: [60, 65, 70, 75, 80, 83], insight: "Startup visa influx" },
    { city: "Chengdu", country: "China", region: "Asia-Pacific", category: "rising", trend: "rising", score: 82, spark: [50, 55, 65, 72, 78, 82], insight: "Culinary tourism spike" },
    { city: "Cartagena", country: "Colombia", region: "Americas", category: "rising", trend: "rising", score: 81, spark: [40, 50, 55, 65, 75, 81], insight: "Caribbean alternative" },
    { city: "Amman", country: "Jordan", region: "Middle East/Africa", category: "rising", trend: "rising", score: 80, spark: [35, 40, 50, 60, 72, 80], insight: "Historical site interest" },
    { city: "Tallinn", country: "Estonia", region: "Europe", category: "rising", trend: "rising", score: 79, spark: [40, 45, 55, 62, 70, 79], insight: "E-residency meetups" },
    { city: "Busan", country: "South Korea", region: "Asia-Pacific", category: "rising", trend: "rising", score: 78, spark: [55, 60, 65, 70, 75, 78], insight: "Coastal getaway trend" },
    { city: "Málaga", country: "Spain", region: "Europe", category: "rising", trend: "rising", score: 77, spark: [60, 62, 65, 70, 74, 77], insight: "Tech worker migration" },
    { city: "Panama City", country: "Panama", region: "Americas", category: "rising", trend: "rising", score: 76, spark: [50, 55, 60, 65, 72, 76], insight: "Regional banking hub" },
    { city: "Muscat", country: "Oman", region: "Middle East/Africa", category: "rising", trend: "rising", score: 75, spark: [30, 40, 50, 55, 65, 75], insight: "Luxury eco-tourism" },
    { city: "Sofia", country: "Bulgaria", region: "Europe", category: "rising", trend: "rising", score: 74, spark: [35, 40, 45, 55, 65, 74], insight: "Value ski destination" },
    { city: "Da Nang", country: "Vietnam", region: "Asia-Pacific", category: "rising", trend: "rising", score: 73, spark: [40, 45, 55, 60, 68, 73], insight: "Beach resort boom" },
    { city: "Baku", country: "Azerbaijan", region: "Asia-Pacific", category: "rising", trend: "rising", score: 72, spark: [30, 35, 45, 55, 65, 72], insight: "F1 tourism tailwind" },
    { city: "Montevideo", country: "Uruguay", region: "Americas", category: "rising", trend: "rising", score: 71, spark: [45, 50, 55, 60, 68, 71], insight: "Stable tech investment" },
    { city: "Riyadh", country: "Saudi Arabia", region: "Middle East/Africa", category: "rising", trend: "rising", score: 70, spark: [40, 50, 60, 65, 68, 70], insight: "Vision 2030 events" },
    { city: "Wilmington", country: "USA", region: "Americas", category: "rising", trend: "rising", score: 69, spark: [50, 52, 55, 60, 65, 69], insight: "Coastal charm discovery" },
    { city: "Brisbane", country: "Australia", region: "Asia-Pacific", category: "rising", trend: "rising", score: 68, spark: [55, 58, 62, 65, 67, 68], insight: "Pre-Olympics infrastructure" },
    { city: "Riga", country: "Latvia", region: "Europe", category: "rising", trend: "rising", score: 67, spark: [40, 42, 48, 55, 62, 67], insight: "Art Nouveau appeal" },
    { city: "Antigua", country: "Guatemala", region: "Americas", category: "rising", trend: "rising", score: 66, spark: [35, 40, 45, 52, 60, 66], insight: "Cultural heritage spikes" },
    { city: "Colombo", country: "Sri Lanka", region: "Asia-Pacific", category: "rising", trend: "rising", score: 65, spark: [20, 25, 35, 45, 55, 65], insight: "Recovery rebound" },
    { city: "Accra", country: "Ghana", region: "Middle East/Africa", category: "rising", trend: "rising", score: 64, spark: [30, 35, 42, 50, 58, 64], insight: "Cultural festival buzz" },
    { city: "Sarajevo", country: "Bosnia", region: "Europe", category: "rising", trend: "rising", score: 63, spark: [30, 32, 40, 50, 58, 63], insight: "Value history tours" },
    { city: "Asunción", country: "Paraguay", region: "Americas", category: "rising", trend: "rising", score: 62, spark: [25, 30, 40, 50, 58, 62], insight: "Expat friendly policy" },
    { city: "Perth", country: "Australia", region: "Asia-Pacific", category: "rising", trend: "rising", score: 61, spark: [50, 52, 55, 58, 60, 61], insight: "Mining sector growth" },
    { city: "Bratislava", country: "Slovakia", region: "Europe", category: "rising", trend: "rising", score: 60, spark: [40, 42, 45, 50, 55, 60], insight: "Danube river cruising" },

    // COOLING / SOFTENING (33)
    { city: "Kyoto", country: "Japan", region: "Asia-Pacific", category: "cooling", trend: "cooling", score: 95, spark: [90, 85, 80, 75, 78, 76], insight: "Post-Sakura season dip" },
    { city: "Ubud", country: "Indonesia", region: "Asia-Pacific", category: "cooling", trend: "cooling", score: 89, spark: [95, 92, 88, 85, 82, 80], insight: "Monsoon season approaching" },
    { city: "Dubai", country: "UAE", region: "Middle East/Africa", category: "cooling", trend: "cooling", score: 80, spark: [98, 95, 90, 85, 82, 80], insight: "Temperatures rising" },
    { city: "Lisbon", country: "Portugal", region: "Europe", category: "cooling", trend: "cooling", score: 78, spark: [90, 88, 86, 84, 80, 78], insight: "Price saturation" },
    { city: "Austin", country: "USA", region: "Americas", category: "cooling", trend: "cooling", score: 75, spark: [85, 82, 80, 78, 76, 75], insight: "Tech migration slowing" },
    { city: "Mykonos", country: "Greece", region: "Europe", category: "cooling", trend: "cooling", score: 74, spark: [95, 90, 85, 80, 76, 74], insight: "Off-peak pricing drops" },
    { city: "Venice", country: "Italy", region: "Europe", category: "cooling", trend: "cooling", score: 73, spark: [92, 88, 85, 82, 78, 73], insight: "Entry fee impact" },
    { city: "Miami", country: "USA", region: "Americas", category: "cooling", trend: "cooling", score: 72, spark: [88, 85, 82, 80, 76, 72], insight: "Humidity highs" },
    { city: "Singapore", country: "Singapore", region: "Asia-Pacific", category: "cooling", trend: "cooling", score: 71, spark: [85, 82, 80, 78, 75, 71], insight: "Conference season end" },
    { city: "Reykjavik", country: "Iceland", region: "Europe", category: "cooling", trend: "cooling", score: 70, spark: [80, 78, 76, 74, 72, 70], insight: "Volcanic activity alert" },
    { city: "Rio de Janeiro", country: "Brazil", region: "Americas", category: "cooling", trend: "cooling", score: 69, spark: [90, 85, 80, 75, 72, 69], insight: "Post-Carnival lull" },
    { city: "Barcelona", country: "Spain", region: "Europe", category: "cooling", trend: "cooling", score: 68, spark: [88, 85, 82, 80, 75, 68], insight: "Overtourism regulatons" },
    { city: "Phuket", country: "Thailand", region: "Asia-Pacific", category: "cooling", trend: "cooling", score: 67, spark: [85, 80, 78, 75, 70, 67], insight: "Rainy season start" },
    { city: "Sydney", country: "Australia", region: "Asia-Pacific", category: "cooling", trend: "cooling", score: 66, spark: [82, 80, 78, 76, 70, 66], insight: "Winter cooling" },
    { city: "Vancouver", country: "Canada", region: "Americas", category: "cooling", trend: "cooling", score: 65, spark: [80, 78, 75, 72, 68, 65], insight: "Housing cost adjustments" },
    { city: "Dubrovnik", country: "Croatia", region: "Europe", category: "cooling", trend: "cooling", score: 64, spark: [90, 85, 80, 75, 70, 64], insight: "Cruise ship limits" },
    { city: "Santorini", country: "Greece", region: "Europe", category: "cooling", trend: "cooling", score: 63, spark: [95, 90, 85, 80, 72, 63], insight: "Shoulder season deals" },
    { city: "Amsterdam", country: "Netherlands", region: "Europe", category: "cooling", trend: "cooling", score: 62, spark: [85, 82, 80, 78, 70, 62], insight: "Tourist tax hike" },
    { city: "San Francisco", country: "USA", region: "Americas", category: "cooling", trend: "cooling", score: 61, spark: [80, 78, 75, 72, 68, 61], insight: "Convention gap" },
    { city: "Tel Aviv", country: "Israel", region: "Middle East/Africa", category: "cooling", trend: "cooling", score: 60, spark: [75, 72, 70, 68, 65, 60], insight: "Geopolitical caution" },
    { city: "Honolulu", country: "USA", region: "Americas", category: "cooling", trend: "cooling", score: 59, spark: [85, 80, 75, 70, 65, 59], insight: "Hotel strike impact" },
    { city: "Cancún", country: "Mexico", region: "Americas", category: "cooling", trend: "cooling", score: 58, spark: [90, 85, 80, 75, 68, 58], insight: "Sargassum season" },
    { city: "Rome", country: "Italy", region: "Europe", category: "cooling", trend: "cooling", score: 57, spark: [88, 85, 82, 78, 70, 57], insight: "Heatwave deterence" },
    { city: "Las Vegas", country: "USA", region: "Americas", category: "cooling", trend: "cooling", score: 56, spark: [85, 82, 80, 75, 70, 56], insight: "Post-CES dip" },
    { city: "Hong Kong", country: "China", region: "Asia-Pacific", category: "cooling", trend: "cooling", score: 55, spark: [80, 78, 75, 72, 65, 55], insight: "Retail shift" },
    { city: "Doha", country: "Qatar", region: "Middle East/Africa", category: "cooling", trend: "cooling", score: 54, spark: [70, 68, 65, 62, 58, 54], insight: "Post-event surplus" },
    { city: "Macau", country: "China", region: "Asia-Pacific", category: "cooling", trend: "cooling", score: 53, spark: [75, 72, 70, 68, 60, 53], insight: "Mainland travel shift" },
    { city: "Nice", country: "France", region: "Europe", category: "cooling", trend: "cooling", score: 52, spark: [82, 80, 78, 75, 65, 52], insight: "Festival fatigue" },
    { city: "Orlando", country: "USA", region: "Americas", category: "cooling", trend: "cooling", score: 51, spark: [85, 80, 75, 70, 62, 51], insight: "Storm season" },
    { city: "Cairo", country: "Egypt", region: "Middle East/Africa", category: "cooling", trend: "cooling", score: 50, spark: [60, 58, 55, 52, 50, 48], insight: "Currency fluctuation" },
    { city: "Chiang Mai", country: "Thailand", region: "Asia-Pacific", category: "cooling", trend: "cooling", score: 49, spark: [70, 68, 65, 60, 55, 49], insight: "Burning season" },
    { city: "Valencia", country: "Spain", region: "Europe", category: "cooling", trend: "cooling", score: 48, spark: [75, 72, 70, 65, 58, 48], insight: "Market correction" },
    { city: "Queenstown", country: "New Zealand", region: "Asia-Pacific", category: "cooling", trend: "cooling", score: 47, spark: [80, 75, 70, 65, 55, 47], insight: "Ski season end" },

    // CLASSIC / ESTABLISHED (32)
    { city: "London", country: "UK", region: "Europe", category: "established", trend: "stable", score: 91, spark: [90, 91, 90, 92, 91, 91], insight: "Consistent high volume" },
    { city: "Paris", country: "France", region: "Europe", category: "established", trend: "stable", score: 86, spark: [85, 86, 85, 87, 86, 86], insight: "Olympic prep stability" },
    { city: "New York", country: "USA", region: "Americas", category: "established", trend: "stable", score: 81, spark: [95, 94, 95, 93, 94, 81], insight: "Holiday season prep" },
    { city: "Mexico City", country: "Mexico", region: "Americas", category: "established", trend: "stable", score: 84, spark: [80, 82, 81, 83, 84, 84], insight: "Culinary capital retention" },
    { city: "Tokyo", country: "Japan", region: "Asia-Pacific", category: "established", trend: "stable", score: 90, spark: [89, 90, 91, 90, 89, 90], insight: "Perennial favorite" },
    { city: "Bangkok", country: "Thailand", region: "Asia-Pacific", category: "established", trend: "stable", score: 88, spark: [87, 88, 89, 88, 87, 88], insight: "Digital nomad staple" },
    { city: "Istanbul", country: "Turkey", region: "Europe", category: "established", trend: "stable", score: 87, spark: [86, 87, 88, 87, 86, 87], insight: "Cross-continental hub" },
    { city: "Berlin", country: "Germany", region: "Europe", category: "established", trend: "stable", score: 83, spark: [82, 83, 84, 83, 82, 83], insight: "Creative industry core" },
    { city: "Los Angeles", country: "USA", region: "Americas", category: "established", trend: "stable", score: 82, spark: [81, 82, 83, 82, 81, 82], insight: "Entertainment constant" },
    { city: "Madrid", country: "Spain", region: "Europe", category: "established", trend: "stable", score: 79, spark: [78, 79, 80, 79, 78, 79], insight: "Business travel steady" },
    { city: "Vienna", country: "Austria", region: "Europe", category: "established", trend: "stable", score: 78, spark: [77, 78, 79, 78, 77, 78], insight: "QoL ranking leader" },
    { city: "Toronto", country: "Canada", region: "Americas", category: "established", trend: "stable", score: 77, spark: [76, 77, 78, 77, 76, 77], insight: "Tech workforce stable" },
    { city: "Chicago", country: "USA", region: "Americas", category: "established", trend: "stable", score: 76, spark: [75, 76, 77, 76, 75, 76], insight: "Midwest anchor" },
    { city: "Melbourne", country: "Australia", region: "Asia-Pacific", category: "established", trend: "stable", score: 75, spark: [74, 75, 76, 75, 74, 75], insight: "Coffee culture stickiness" },
    { city: "Sao Paulo", country: "Brazil", region: "Americas", category: "established", trend: "stable", score: 74, spark: [73, 74, 75, 74, 73, 74], insight: "Financial center flow" },
    { city: "Mumbai", country: "India", region: "Asia-Pacific", category: "established", trend: "stable", score: 73, spark: [72, 73, 74, 73, 72, 73], insight: "Bollywood tourism" },
    { city: "Shanghai", country: "China", region: "Asia-Pacific", category: "established", trend: "stable", score: 72, spark: [71, 72, 73, 72, 71, 72], insight: "Trade expo volume" },
    { city: "Beijing", country: "China", region: "Asia-Pacific", category: "established", trend: "stable", score: 71, spark: [70, 71, 72, 71, 70, 71], insight: "Capital stability" },
    { city: "Munich", country: "Germany", region: "Europe", category: "established", trend: "stable", score: 70, spark: [69, 70, 71, 70, 69, 70], insight: "Engineering hub" },
    { city: "Milan", country: "Italy", region: "Europe", category: "established", trend: "stable", score: 69, spark: [68, 69, 70, 69, 68, 69], insight: "Fashion week consistent" },
    { city: "Stockholm", country: "Sweden", region: "Europe", category: "established", trend: "stable", score: 68, spark: [67, 68, 69, 68, 67, 68], insight: "Nordic business hub" },
    { city: "Zurich", country: "Switzerland", region: "Europe", category: "established", trend: "stable", score: 67, spark: [66, 67, 68, 67, 66, 67], insight: "Banking sector steady" },
    { city: "Warsaw", country: "Poland", region: "Europe", category: "established", trend: "stable", score: 66, spark: [65, 66, 67, 66, 65, 66], insight: "Central EU hub" },
    { city: "Prague", country: "Czech Republic", region: "Europe", category: "established", trend: "stable", score: 65, spark: [64, 65, 66, 65, 64, 65], insight: "Stag party regulation" },
    { city: "Budapest", country: "Hungary", region: "Europe", category: "established", trend: "stable", score: 64, spark: [63, 64, 65, 64, 63, 64], insight: "Spa tourism steady" },
    { city: "Copenhagen", country: "Denmark", region: "Europe", category: "established", trend: "stable", score: 63, spark: [62, 63, 64, 63, 62, 63], insight: "Design week impact" },
    { city: "Brussels", country: "Belgium", region: "Europe", category: "established", trend: "stable", score: 62, spark: [61, 62, 63, 62, 61, 62], insight: "EU politics hub" },
    { city: "Dublin", country: "Ireland", region: "Europe", category: "established", trend: "stable", score: 61, spark: [60, 61, 62, 61, 60, 61], insight: "Tech HQ presence" },
    { city: "Oslo", country: "Norway", region: "Europe", category: "established", trend: "stable", score: 60, spark: [59, 60, 61, 60, 59, 60], insight: "Energy sector events" },
    { city: "Helsinki", country: "Finland", region: "Europe", category: "established", trend: "stable", score: 59, spark: [58, 59, 60, 59, 58, 59], insight: "Slush conference prep" },
    { city: "Athens", country: "Greece", region: "Europe", category: "established", trend: "stable", score: 58, spark: [57, 58, 59, 58, 57, 58], insight: "History tourism base" },
    { city: "Kuala Lumpur", country: "Malaysia", region: "Asia-Pacific", category: "established", trend: "stable", score: 57, spark: [56, 57, 58, 57, 56, 57], insight: "Transit hub volume" }
];

export async function GET() {
    try {
        // 1. CLEAR TABLE
        const { error: deleteError } = await supabase
            .from('city_trends')
            .delete()
            .neq('id', 0); // Delete all rows where ID != 0 (efficient way to clear all)

        if (deleteError) throw deleteError;

        // 2. INSERT 100 CITIES
        const { error: insertError } = await supabase
            .from('city_trends')
            .insert(cities.map((c, i) => ({
                rank: i + 1, // Global rank calc could be better but this is fine for seed
                city: c.city,
                country: c.country,
                region: c.region,
                category: c.category,
                trend_direction: c.trend,
                index_score: c.score,
                sparkline_data: c.spark,
                insight: c.insight
            })));

        if (insertError) throw insertError;

        return NextResponse.json({ success: true, message: `Seeded ${cities.length} cities.` });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
