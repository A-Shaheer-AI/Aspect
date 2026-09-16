import { NextRequest, NextResponse } from "next/server";

interface PurgeRequestBody {
    purge_everything?: boolean;
    files?: string[];
    tags?: string[];
    prefixes?: string[];
    hosts?: string[];
}

function verifyAuthorization(request: NextRequest): boolean {
    const configuredSecret = process.env.CLOUDFLARE_PURGE_SECRET;

    // Secret must be configured in environment variables for security
    if (!configuredSecret) {
        return false;
    }

    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.substring(7).trim()
        : null;
    const urlSecret = request.nextUrl.searchParams.get("secret");

    return bearerToken === configuredSecret || urlSecret === configuredSecret;
}

export async function POST(request: NextRequest) {
    try {
        if (!process.env.CLOUDFLARE_PURGE_SECRET) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Server configuration error: CLOUDFLARE_PURGE_SECRET is not set in Vercel environment variables.",
                },
                { status: 500 }
            );
        }

        if (!verifyAuthorization(request)) {
            return NextResponse.json(
                { success: false, error: "Unauthorized: Invalid or missing secret token." },
                { status: 401 }
            );
        }

        const zoneId = process.env.CLOUDFLARE_ZONE_ID;
        const apiToken = process.env.CLOUDFLARE_API_TOKEN;

        if (!zoneId || !apiToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing CLOUDFLARE_ZONE_ID or CLOUDFLARE_API_TOKEN in Vercel environment variables.",
                },
                { status: 500 }
            );
        }

        let body: PurgeRequestBody = {};
        try {
            body = await request.json();
        } catch {
            // Handle empty or malformed JSON
        }

        const purgeEverythingParam =
            request.nextUrl.searchParams.get("purge_everything") === "true";

        let cfPayload: Record<string, unknown> = {};

        if (body.purge_everything || purgeEverythingParam) {
            cfPayload = { purge_everything: true };
        } else if (Array.isArray(body.files) && body.files.length > 0) {
            cfPayload = { files: body.files };
        } else if (Array.isArray(body.tags) && body.tags.length > 0) {
            cfPayload = { tags: body.tags };
        } else if (Array.isArray(body.prefixes) && body.prefixes.length > 0) {
            cfPayload = { prefixes: body.prefixes };
        } else if (Array.isArray(body.hosts) && body.hosts.length > 0) {
            cfPayload = { hosts: body.hosts };
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        "Specify { purge_everything: true } or { files: [...] } in request body.",
                },
                { status: 400 }
            );
        }

        const cfRes = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cfPayload),
            }
        );

        const cfData = await cfRes.json();

        if (!cfRes.ok || !cfData.success) {
            return NextResponse.json(
                {
                    success: false,
                    status: cfRes.status,
                    errors: cfData.errors,
                    messages: cfData.messages,
                },
                { status: cfRes.status || 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Cloudflare cache successfully purged",
            result: cfData.result,
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Internal error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        if (!process.env.CLOUDFLARE_PURGE_SECRET) {
            return NextResponse.json(
                {
                    success: false,
                    error: "CLOUDFLARE_PURGE_SECRET is not configured in Vercel environment variables.",
                },
                { status: 500 }
            );
        }

        if (!verifyAuthorization(request)) {
            return NextResponse.json(
                { success: false, error: "Unauthorized: Invalid or missing ?secret= parameter." },
                { status: 401 }
            );
        }

        const zoneId = process.env.CLOUDFLARE_ZONE_ID;
        const apiToken = process.env.CLOUDFLARE_API_TOKEN;

        if (!zoneId || !apiToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing CLOUDFLARE_ZONE_ID or CLOUDFLARE_API_TOKEN in environment variables.",
                },
                { status: 500 }
            );
        }

        const purgeEverything =
            request.nextUrl.searchParams.get("purge_everything") === "true";
        const file = request.nextUrl.searchParams.get("file");

        if (!purgeEverything && !file) {
            return NextResponse.json({
                success: true,
                status: "Configured and operational",
                usage: "Pass ?secret=...&purge_everything=true or ?secret=...&file=https://aspectwindowcleaning.com.au/media/example.webp to purge.",
            });
        }

        const cfPayload = file ? { files: [file] } : { purge_everything: true };

        const cfRes = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cfPayload),
            }
        );

        const cfData = await cfRes.json();

        return NextResponse.json({
            success: cfData.success,
            result: cfData.result,
            errors: cfData.errors,
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Internal error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
