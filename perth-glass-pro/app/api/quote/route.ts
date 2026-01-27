import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        console.log("Quote Request Received:", {
            timestamp: new Date().toISOString(),
            ...data,
        });

        // TODO: Implement actual email sending or database storage
        // Example: await sendEmail(data);
        // Example: await db.quotes.create({ data });

        return NextResponse.json(
            { success: true, message: "Quote request received" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Quote API Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to process quote request" },
            { status: 500 }
        );
    }
}
