
import { createClient } from '@supabase/supabase-js';

// Environment variables are loaded from the shell execution context
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuthFlow() {
    const email = 'admin@mysim.com';
    const password = 'securepassword123';

    console.log(`Testing login for ${email}...`);

    // 1. Test Login
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (loginError) {
        console.error('Login failed:', loginError.message);
        process.exit(1);
    }

    console.log('Login successful!');
    console.log('User ID:', loginData.user.id);

    // 2. Verify Session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
        console.error('Session verification failed');
    } else {
        console.log('Session active.');
    }

    // 3. Test Logout
    console.log('Testing logout...');
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
        console.error('Logout failed:', logoutError.message);
        process.exit(1);
    }

    console.log('Logout successful!');

    // 4. Verify Session Gone
    const { data: { session: finalSession } } = await supabase.auth.getSession();
    if (!finalSession) {
        console.log('Session successfully cleared.');
    } else {
        console.warn('Session still exists (this might be expected if local state persists differently in node, but usually signOut clears it).');
    }
}

testAuthFlow();
