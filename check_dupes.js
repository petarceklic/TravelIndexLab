
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function check() {
    const { data, error } = await supabase.from('city_trends').select('*');
    if (error) {
        console.error(error);
        return;
    }
    console.log(`Total rows: ${data.length}`);

    const counts = {};
    data.forEach(c => {
        counts[c.city] = (counts[c.city] || 0) + 1;
    });

    const dupes = Object.entries(counts).filter(([k, v]) => v > 1);
    if (dupes.length > 0) {
        console.log("DUPLICATES FOUND:");
        console.log(dupes);
    } else {
        console.log("No duplicates found.");
    }
}

check();
