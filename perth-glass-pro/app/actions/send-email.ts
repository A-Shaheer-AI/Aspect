"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key");

export interface LeadEmailData {
    name: string;
    phone: string;
    email?: string;
    suburb: string;
    serviceType?: string;
    scope?: string;
    storeys?: string;
    bedrooms?: number;
    condition?: string;
    selectedTier?: string;
    packagePrice?: string;
    priceEstimate?: number;
    message?: string;
    isUrgent?: boolean;
    flexibleNotes?: string;
    quoteType?: string;
    anonId?: string;

    // Standard Lead Source & Attribution
    sourceUrl?: string;
    landingUrl?: string;
    submissionUrl?: string;
    referrer?: string;
    fullQuery?: string;
    sourceSummary?: string;
    formName?: string;
    gclid?: string;
    gbraid?: string;
    wbraid?: string;
    fbclid?: string;
    msclkid?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    device?: string;
    landingTime?: string;
}

export async function sendLeadEmail(data: LeadEmailData) {
    try {
        // Validate required fields
        if (!data.name || !data.phone) {
            return { success: false, error: "Name and phone are required" };
        }

        const toEmail = process.env.MY_EMAIL;
        if (!toEmail) {
            console.error("MY_EMAIL environment variable not set");
            return { success: false, error: "Email configuration error" };
        }

        // Build email subject
        const serviceLabel = data.serviceType || data.selectedTier || "General Inquiry";
        const subject = `🏠 New Lead: ${data.name} - ${serviceLabel}`;

        // Normalise attribution data
        const rawUrl = data.landingUrl || data.sourceUrl || data.submissionUrl || "";
        let extractedGclid = data.gclid || "";
        let extractedGbraid = data.gbraid || "";
        let extractedWbraid = data.wbraid || "";
        let extractedFbclid = data.fbclid || "";
        let extractedMsclkid = data.msclkid || "";
        let extractedKeyword = data.utmTerm || "";
        let extractedDevice = data.device || "";
        let extractedCampaign = data.utmCampaign || "";
        let extractedSource = data.utmSource || "";
        let extractedMedium = data.utmMedium || "";
        let extractedReferrer = data.referrer || "";
        let extractedFullQuery = data.fullQuery || "";

        if (rawUrl) {
            try {
                const u = new URL(rawUrl.startsWith("http") ? rawUrl : `https://aspectwindowcleaning.com.au${rawUrl}`);
                if (!extractedGclid) extractedGclid = u.searchParams.get("gclid") || "";
                if (!extractedGbraid) extractedGbraid = u.searchParams.get("gbraid") || "";
                if (!extractedWbraid) extractedWbraid = u.searchParams.get("wbraid") || "";
                if (!extractedFbclid) extractedFbclid = u.searchParams.get("fbclid") || "";
                if (!extractedMsclkid) extractedMsclkid = u.searchParams.get("msclkid") || "";
                if (!extractedKeyword) extractedKeyword = u.searchParams.get("utm_term") || u.searchParams.get("keyword") || "";
                if (!extractedDevice) extractedDevice = u.searchParams.get("device") || "";
                if (!extractedCampaign) extractedCampaign = u.searchParams.get("utm_campaign") || "";
                if (!extractedSource) extractedSource = u.searchParams.get("utm_source") || "";
                if (!extractedMedium) extractedMedium = u.searchParams.get("utm_medium") || "";
                if (!extractedFullQuery) extractedFullQuery = u.search || "";
            } catch (e) {}
        }

        const displaySource =
            data.sourceSummary ||
            (extractedGclid || extractedGbraid || extractedWbraid
                ? `Google Ads (Paid Search)${extractedCampaign ? ` - [${extractedCampaign}]` : ""}`
                : extractedFbclid
                ? `Meta / Facebook Ads${extractedCampaign ? ` - [${extractedCampaign}]` : ""}`
                : extractedMsclkid
                ? `Bing Ads (Paid Search)${extractedCampaign ? ` - [${extractedCampaign}]` : ""}`
                : rawUrl.includes("/landing")
                ? "Google Ads Landing Page (/landing)"
                : extractedSource
                ? `${extractedSource} / ${extractedMedium || "campaign"}`
                : extractedReferrer && !extractedReferrer.includes("aspectwindowcleaning.com.au") && extractedReferrer !== "Direct / None"
                ? `Referral (${extractedReferrer})`
                : "Direct Visit / Organic");

        const displayForm = data.formName || data.quoteType || "Website Quote Form";
        const displayLanding = data.landingUrl || rawUrl || "https://aspectwindowcleaning.com.au";
        const displaySubmission = data.submissionUrl || data.sourceUrl || rawUrl || "https://aspectwindowcleaning.com.au";

        // Determine property and package display details
        const displayStoreys = (() => {
            if (!data.storeys) return null;
            const clean = data.storeys.toLowerCase().trim();
            if (clean === "single" || clean.includes("single")) return "Single Storey";
            if (clean === "double" || clean.includes("double")) return "Double Storey";
            return data.storeys;
        })();

        const displayTier = (() => {
            if (!data.selectedTier) return null;
            const clean = data.selectedTier.toLowerCase().trim();
            if (clean === "essential" || clean.includes("essential")) return "Essential (Exterior Only)";
            if (clean === "standard" || clean.includes("standard")) return "Standard (Inside & Out)";
            if (clean === "supreme" || clean.includes("supreme")) return "Supreme (Restorative Detailing)";
            if (clean === "premium" || clean.includes("revival")) return "Window Revival (Full Detail)";
            return data.selectedTier;
        })();

        const displayScope = (() => {
            if (!data.scope) return null;
            const clean = data.scope.toLowerCase().trim();
            if (clean === "int_ext" || clean.includes("inside") || clean.includes("both")) return "Inside & Out";
            if (clean === "exterior" || clean.includes("ext")) return "Exterior Only";
            return data.scope;
        })();

        const displayPackagePrice = (() => {
            if (data.packagePrice) return data.packagePrice;
            if (data.message && data.message.includes("Selected Price:")) {
                const match = data.message.match(/Selected Price:\s*(.+)/i);
                if (match) return match[1].trim();
            }
            return null;
        })();

        const displayNotes = (() => {
            let notes = (data.message || data.flexibleNotes || "").trim();
            if (notes.startsWith("Selected Price:")) {
                const remainder = notes.replace(/^Selected Price:[^\n]*\n?/i, "").trim();
                return remainder || null;
            }
            return notes || null;
        })();

        // Ingest lead profile and trigger automatic warm-up SMS
        try {
            const { ingestLead } = await import("@/lib/leads/ingest");
            await ingestLead({
                name: data.name,
                phone: data.phone,
                email: data.email,
                suburb: data.suburb,
                serviceType: serviceLabel,
                storeys: data.storeys,
                scope: data.scope,
                bedrooms: data.bedrooms,
                condition: data.condition,
                selectedTier: data.selectedTier,
                priceEstimate: data.priceEstimate,
                message: data.message || data.flexibleNotes,
                sourceUrl: displaySubmission,
                landingUrl: displayLanding,
                submissionUrl: displaySubmission,
                referrer: extractedReferrer,
                fullQuery: extractedFullQuery,
                sourceSummary: displaySource,
                formName: displayForm,
                gclid: extractedGclid,
                keyword: extractedKeyword,
                device: extractedDevice,
            });
        } catch (leadErr) {
            console.error("Auto-reply lead ingestion error:", leadErr);
        }

        // Build email HTML
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #0F2B4C; color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">Aspect Window Cleaning</h1>
                    <p style="margin: 5px 0 0; opacity: 0.8;">New Quote Request</p>
                </div>
                
                <div style="padding: 30px; background: #f8fafc;">
                    <h2 style="color: #0F2B4C; margin-top: 0;">Contact Details</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Name:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                            ${data.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><a href="tel:${data.phone}" style="color: #D4AF37;">${data.phone}</a></td>
                        </tr>
                        ${data.email ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #D4AF37;">${data.email}</a></td>
                        </tr>
                        ` : ""}
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Suburb:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.suburb}</td>
                        </tr>
                    </table>

                    ${displayStoreys || displayTier || displayPackagePrice || displayScope || data.bedrooms || data.condition ? `
                    <h2 style="color: #0F2B4C; margin-top: 30px;">Property & Package Details</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        ${displayStoreys ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; width: 35%;"><strong>Storeys:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0F2B4C;">${displayStoreys}</td>
                        </tr>
                        ` : ""}
                        ${displayTier ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; width: 35%;"><strong>Selected Package:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #D4AF37;">
                                ${displayTier}
                            </td>
                        </tr>
                        ` : ""}
                        ${displayPackagePrice ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; width: 35%;"><strong>Package Rate:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #0F2B4C; font-size: 15px;">
                                ${displayPackagePrice}
                            </td>
                        </tr>
                        ` : ""}
                        ${displayScope ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; width: 35%;"><strong>Scope:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${displayScope}</td>
                        </tr>
                        ` : ""}
                        ${data.bedrooms ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; width: 35%;"><strong>Bedrooms:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.bedrooms}</td>
                        </tr>
                        ` : ""}
                        ${data.condition ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; width: 35%;"><strong>Window Condition:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.condition}</td>
                        </tr>
                        ` : ""}
                    </table>
                    ` : ""}

                    <!-- TRAFFIC & LEAD SOURCE -->
                    <div style="margin-top: 30px; background: white; border-radius: 12px; border: 1.5px solid #D4AF37; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                        <div style="margin-bottom: 15px; border-bottom: 2px solid #0F2B4C; padding-bottom: 8px;">
                            <span style="background: #0F2B4C; color: #FFE54D; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 11px; float: right;">
                                ${displaySource}
                            </span>
                            <h2 style="color: #0F2B4C; margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 0.5px;">
                                📍 Traffic & Lead Source
                            </h2>
                            <div style="clear: both;"></div>
                        </div>
                        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                            <tr>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; width: 35%; color: #64748b;"><strong>Primary Source:</strong></td>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0F2B4C;">
                                    ${displaySource}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Form Submitted:</strong></td>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0F2B4C;">
                                    ${displayForm}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>First Landing Page:</strong></td>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; word-break: break-all;">
                                    <a href="${displayLanding}" target="_blank" style="color: #000080; font-weight: 500;">
                                        ${displayLanding}
                                    </a>
                                </td>
                            </tr>
                            ${displaySubmission && displaySubmission !== displayLanding ? `
                            <tr>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Submission Page:</strong></td>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; word-break: break-all;">
                                    <a href="${displaySubmission}" target="_blank" style="color: #64748b;">
                                        ${displaySubmission}
                                    </a>
                                </td>
                            </tr>
                            ` : ""}
                            <tr>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Initial Referrer:</strong></td>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; color: #334155; word-break: break-all;">
                                    ${extractedReferrer || "Direct Visit / No Referrer"}
                                </td>
                            </tr>
                            ${extractedGclid ? `
                            <tr>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Google Click ID (GCLID):</strong></td>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; font-family: monospace; font-size: 11px; color: #0F2B4C; word-break: break-all; background: #fffbeb; padding: 4px 6px; border-radius: 4px;">
                                    ${extractedGclid}
                                </td>
                            </tr>
                            ` : ""}
                            ${extractedCampaign || extractedKeyword ? `
                            <tr>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Campaign / Keyword:</strong></td>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; color: #0F2B4C;">
                                    ${extractedCampaign ? `Campaign: <strong>${extractedCampaign}</strong> ` : ""}${extractedKeyword ? `| Keyword: <em>${extractedKeyword}</em>` : ""}
                                </td>
                            </tr>
                            ` : ""}
                            ${extractedFullQuery ? `
                            <tr>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Full Query String:</strong></td>
                                <td style="padding: 7px 0; border-bottom: 1px solid #f1f5f9; font-family: monospace; font-size: 11px; color: #475569; word-break: break-all; background: #f8fafc; padding: 4px 6px; border-radius: 4px;">
                                    ${extractedFullQuery}
                                </td>
                            </tr>
                            ` : ""}
                            <tr>
                                <td style="padding: 7px 0; color: #64748b;"><strong>Device:</strong></td>
                                <td style="padding: 7px 0; color: #334155;">
                                    ${extractedDevice || "Desktop / Mobile"}
                                </td>
                            </tr>
                        </table>
                    </div>

                    ${data.priceEstimate ? `
                    <div style="background: #D4AF37; color: #0F2B4C; padding: 20px; border-radius: 12px; margin-top: 20px; text-align: center;">
                        <p style="margin: 0; font-size: 14px; opacity: 0.8;">INDICATIVE QUOTE</p>
                        <p style="margin: 5px 0 0; font-size: 32px; font-weight: bold;">$${data.priceEstimate} + GST</p>
                        ${data.isUrgent ? `<p style="margin: 5px 0 0; font-size: 12px;">⚡ Includes $50 Priority Fee</p>` : ""}
                    </div>
                    ` : ""}

                    ${displayNotes ? `
                    <h2 style="color: #0F2B4C; margin-top: 30px;">Additional Notes</h2>
                    <p style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                        ${displayNotes}
                    </p>
                    ` : ""}
                </div>

                <div style="background: #0F2B4C; color: white; padding: 15px; text-align: center; font-size: 12px;">
                    <p style="margin: 0;">Lead received at ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Perth" })}</p>
                </div>
            </div>
        `;

        const { data: emailResult, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
            to: toEmail,
            subject: subject,
            html: htmlContent,
        });

        if (error) {
            console.error("Resend API Error:", error);
            return { success: false, error: error.message };
        }

        // Track conversion in Opinly Analytics
        if (process.env.OPINLY_API_KEY && (data.email || data.anonId)) {
            try {
                const { opinly } = await import('@/clients/opinly');
                const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

                await opinly.track(
                    'generate_lead',
                    {
                        service: data.serviceType || data.selectedTier || 'Window Cleaning',
                        suburb: data.suburb,
                        priceEstimate: data.priceEstimate,
                        scope: data.scope,
                    },
                    {
                        email: data.email,
                        anonId: data.anonId,
                        externalEventId: eventId,
                    }
                );

                if (data.priceEstimate && Number(data.priceEstimate) > 0) {
                    await opinly.track(
                        'purchase',
                        {
                            value: Number(data.priceEstimate),
                            currency: 'AUD',
                            transaction_id: eventId,
                        },
                        {
                            email: data.email,
                            anonId: data.anonId,
                            externalEventId: `order_${eventId}`,
                        }
                    );
                }
            } catch (opinlyErr) {
                console.warn('Opinly server tracking error:', opinlyErr);
            }
        }

        console.log("Email sent successfully:", emailResult?.id);
        return { success: true, emailId: emailResult?.id };

    } catch (error) {
        console.error("sendLeadEmail error:", error);
        return { success: false, error: "Failed to send email" };
    }
}
