
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function wipe() {
    console.log("Attempting to wipe table...");
    const { error, count, data } = await supabase.from('city_trends').delete().neq('id', 0).select();

    if (error) {
        console.error("Delete Error:", error);
        return;
    }

    console.log(`Deleted rows. Data length returned: ${data?.length}`);
}

wipe();
