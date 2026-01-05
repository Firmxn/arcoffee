import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh auth token
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Protect Admin Routes
    if (request.nextUrl.pathname.startsWith("/admin") && !user) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // 2. Redirect from Login to Admin if already Logged In
    if (request.nextUrl.pathname.startsWith("/login") && user) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/dashboard"; // Atau halaman default admin lainnya
        return NextResponse.redirect(url);
    }

    return response;
}
