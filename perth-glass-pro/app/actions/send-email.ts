"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadEmailData {
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
    priceEstimate?: number;
    message?: string;
    isUrgent?: boolean;
    flexibleNotes?: string;
    quoteType?: string;

    sourceUrl?: string; // 👈 ADD THIS
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
                        ${data.sourceUrl ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong>Source Page:</strong>
                            </td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                                <a href="${data.sourceUrl}" target="_blank" style="color: #D4AF37;">
                                  ${data.sourceUrl}
                                </a>
                            </td>
                        </tr>
                        ` : ""}
                    </table>

                    ${data.selectedTier || data.storeys ? `
                    <h2 style="color: #0F2B4C; margin-top: 30px;">Property Details</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        ${data.storeys ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Storeys:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.storeys === "single" ? "Single Storey" : "Double Storey"}</td>
                        </tr>
                        ` : ""}
                        ${data.scope ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Scope:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.scope === "int_ext" ? "Inside & Out" : "Exterior Only"}</td>
                        </tr>
                        ` : ""}
                        ${data.bedrooms ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Bedrooms:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.bedrooms}</td>
                        </tr>
                        ` : ""}
                        ${data.condition ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Window Condition:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.condition}</td>
                        </tr>
                        ` : ""}
                        ${data.selectedTier ? `
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Selected Package:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #D4AF37;">
                                ${data.selectedTier === "essential" ? "Essential Refresh" : data.selectedTier === "standard" ? "Window Care" : "Window Revival"}
                            </td>
                        </tr>
                        ` : ""}
                    </table>
                    ` : ""}

                    ${data.priceEstimate ? `
                    <div style="background: #D4AF37; color: #0F2B4C; padding: 20px; border-radius: 12px; margin-top: 20px; text-align: center;">
                        <p style="margin: 0; font-size: 14px; opacity: 0.8;">INDICATIVE QUOTE</p>
                        <p style="margin: 5px 0 0; font-size: 32px; font-weight: bold;">$${data.priceEstimate} + GST</p>
                        ${data.isUrgent ? `<p style="margin: 5px 0 0; font-size: 12px;">⚡ Includes $50 Priority Fee</p>` : ""}
                    </div>
                    ` : ""}

                    ${data.message || data.flexibleNotes ? `
                    <h2 style="color: #0F2B4C; margin-top: 30px;">Additional Notes</h2>
                    <p style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                        ${data.message || data.flexibleNotes}
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

        console.log("Email sent successfully:", emailResult?.id);
        return { success: true, emailId: emailResult?.id };

    } catch (error) {
        console.error("sendLeadEmail error:", error);
        return { success: false, error: "Failed to send email" };
    }
}
