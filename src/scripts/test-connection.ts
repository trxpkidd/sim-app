
import { createClient } from '@supabase/supabase-js';
// Environment variables are loaded from the shell execution context

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing Supabase connection...');
    console.log('URL:', supabaseUrl);

    try {
        const { count, error } = await supabase.from('users').select('*', { count: 'exact', head: true });

        if (error) {
            console.error('Connection failed:', error.message);
        } else {
            console.log('Connection successful!');
            console.log('Users count:', count);
        }

        // Attempt a simple read
        const { data: users, error: selectError } = await supabase.from('users').select('*').limit(1);

        if (selectError) {
            console.error('Select failed:', selectError.message);
        } else {
            console.log('Select successful. Rows found:', users.length);
        }

    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

testConnection();
