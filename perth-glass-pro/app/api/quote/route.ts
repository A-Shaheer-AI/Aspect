import { NextRequest, NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";
import { sendLeadEmail } from "@/app/actions/send-email";
import { BUSINESS } from "@/lib/config";

export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get("content-type") || "";
        const isFormSubmit =
            contentType.includes("application/x-www-form-urlencoded") ||
            contentType.includes("multipart/form-data");

        let data: Record<string, any> = {};

        if (isFormSubmit) {
            const formData = await request.formData();
            data = Object.fromEntries(formData.entries());
        } else {
            data = await request.json();
        }

        // Send lead email notification via Server Action logic
        try {
            await sendLeadEmail({
                name: (data.name as string) || "Anonymous",
                phone: (data.phone as string) || "",
                email: (data.email as string) || "Not provided (Landing Direct Post)",
                suburb: (data.suburb as string) || (data.address as string) || "Perth Metro",
                serviceType:
                    (data.service as string) ||
                    (data.serviceType as string) ||
                    "Quote Request (Landing)",
                message:
                    (data.message as string) ||
                    (data.promo ? `Promo code: ${data.promo}` : undefined),
                sourceUrl: "/landing (direct fallback POST)",
            });
        } catch (mailErr) {
            console.error("Lead email notification error:", mailErr);
        }

        if (process.env.BREVO_API && data.email && String(data.email).includes("@")) {
            try {
                const brevo = new BrevoClient({
                    apiKey: process.env.BREVO_API!,
                });

                await brevo.contacts.createContact({
                    email: data.email,
                    attributes: {
                        FIRSTNAME: data.name,
                        SMS: data.phone,
                        SUBURB: data.suburb,
                    },
                    listIds: [2],
                    updateEnabled: true,
                });
            } catch (bErr) {
                console.error("Brevo contact error:", bErr);
            }
        }

        console.log("Quote Request Received:", {
            timestamp: new Date().toISOString(),
            ...data,
        });

        // If submitted natively by browser form POST (zero-JS or fallback mode),
        // return a lightweight, styled HTML confirmation page instead of raw JSON.
        if (isFormSubmit) {
            const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Quote Request Received | Aspect Window Cleaning</title>
<style>
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #07077E;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
}
.card {
    background: #ffffff;
    color: #07077E;
    border-radius: 24px;
    padding: 40px 24px;
    max-width: 460px;
    width: 100%;
    box-shadow: 0 24px 48px rgba(0,0,0,0.35);
}
.icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #dcfce7;
    color: #16a34a;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    font-size: 32px;
}
h1 {
    font-size: 26px;
    margin: 0 0 12px;
    font-weight: 800;
}
p {
    color: #4b5563;
    font-size: 15px;
    line-height: 1.6;
    margin: 0 0 24px;
}
.btn {
    display: inline-block;
    background: #FFE54D;
    color: #07077E;
    font-weight: 800;
    text-decoration: none;
    padding: 16px 32px;
    border-radius: 14px;
    font-size: 16px;
}
.tel {
    display: block;
    margin-top: 20px;
    color: #07077E;
    font-weight: 700;
    font-size: 15px;
    text-decoration: underline;
}
</style>
</head>
<body>
<div class="card">
    <div class="icon">&#10004;</div>
    <h1>Quote Request Received!</h1>
    <p>Thank you! Our Perth team has received your quote details and will text or call you within 60 minutes.</p>
    <a href="/landing" class="btn">Return to Page</a>
    <a href="tel:${BUSINESS.phoneRaw}" class="tel">Need immediate help? Call ${BUSINESS.phone}</a>
</div>
</body>
</html>`;
            return new NextResponse(html, {
                status: 200,
                headers: { "Content-Type": "text/html; charset=utf-8" },
            });
        }

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
