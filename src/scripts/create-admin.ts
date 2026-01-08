
import { createClient } from '@supabase/supabase-js';

// Environment variables are loaded from the shell execution context
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Usually need SERVICE_ROLE key for admin actions like updating any user?
// Wait, to create a user and force a role, I might need service role key.
// But I only have ANON KEY in .env.local usually (based on my previous steps).
// Let's check if I can get the service role key from the MCP tools?
// I used `mcp_supabase-mcp-server_get_publishable_keys`. That returns anon and publishable.
// Service role key is usually secret.
// IF I can't get service role key, I can sign up as the user, then use `execute_sql` tool to update the role manually!
// YES. I have `execute_sql` tool.

// Revised plan for this script:
// Just sign up the user.
// Then I will use the `execute_sql` tool to update the role to 'admin'.

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
    const email = 'admin@mysim.com';
    const password = 'securepassword123';
    const username = 'AdminUser';

    console.log(`Creating user ${email}...`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username }
        }
    });

    if (error) {
        console.error('Error creating user:', error.message);
        // If user already exists, that's fine, we will proceed to try to update role via SQL tool later
        if (!error.message.includes('already registered')) {
            process.exit(1);
        } else {
            console.log('User likely already exists, proceeding matches...');
        }
    } else {
        console.log('User created successfully (or email confirmation sent).');
        if (data.user) {
            console.log('User ID:', data.user.id);
            // We can't update public.users directly here with anon key if RLS forbids it for other users or fields.
            // But usually authenticated user can update their own profile?
            // The schema showed `role` is updatable, but maybe only by admin?
            // "check":"role = ANY (ARRAY['admin'::text, 'moderator'::text, 'player'::text, 'observer'::text])"
            // "default_value":"'observer'::text"
        }
    }
}

createAdmin();
