import { createClient } from "@supabase/supabase-js";

// Client ini menggunakan SERVICE_ROLE_KEY untuk bypass RLS
// HANYA gunakan ini di Server Actions (backend), jangan di Client Component!
export function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}
