import { NextRequest, NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const brevo = new BrevoClient({
            apiKey: process.env.BREVO_API!,
        });

        await brevo.contacts.createContact({
            email: data.email,
            attributes: {
                FIRSTNAME: data.name,
                SMS: data.phone,
                SUBURB: data.suburb
            },
            listIds: [2],
            updateEnabled: true
        });

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
