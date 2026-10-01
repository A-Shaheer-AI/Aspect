// Centralized Lead Attribution Tracking Engine
// Captures and preserves first-touch traffic source, Google Ads click IDs, UTM parameters, and full query strings across page navigation.

export interface LeadAttribution {
    landingUrl: string;
    submissionUrl: string;
    referrer: string;
    fullQuery: string;
    sourceSummary: string;
    formName: string;
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
    device: string;
    landingTime?: string;
}

const STORAGE_KEYS = {
    LANDING_URL: "aspect_lead_landing_url",
    REFERRER: "aspect_lead_referrer",
    FULL_QUERY: "aspect_lead_full_query",
    LANDING_TIME: "aspect_lead_landing_time",
    GCLID: "aspect_lead_gclid",
    GBRAID: "aspect_lead_gbraid",
    WBRAID: "aspect_lead_wbraid",
    FBCLID: "aspect_lead_fbclid",
    MSCLKID: "aspect_lead_msclkid",
    UTM_SOURCE: "aspect_lead_utm_source",
    UTM_MEDIUM: "aspect_lead_utm_medium",
    UTM_CAMPAIGN: "aspect_lead_utm_campaign",
    UTM_TERM: "aspect_lead_utm_term",
    UTM_CONTENT: "aspect_lead_utm_content",
};

function safeGetStorage(key: string): string {
    if (typeof window === "undefined") return "";
    try {
        return sessionStorage.getItem(key) || localStorage.getItem(key) || "";
    } catch {
        return "";
    }
}

function safeSetStorage(key: string, value: string) {
    if (typeof window === "undefined" || !value) return;
    try {
        sessionStorage.setItem(key, value);
        localStorage.setItem(key, value);
    } catch {
        // Ignore private browsing storage quota exceptions
    }
}

export function detectDevice(): string {
    if (typeof window === "undefined" || !navigator.userAgent) return "Desktop";
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "Tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
        return "Mobile";
    }
    return "Desktop";
}

/**
 * Initialize attribution on initial page load.
 * Preserves first-touch attribution while updating if a fresh ad click / UTM arrival is detected.
 */
export function initAttribution(): void {
    if (typeof window === "undefined") return;

    try {
        const currentUrl = new URL(window.location.href);
        const searchParams = currentUrl.searchParams;

        const gclid = searchParams.get("gclid") || "";
        const gbraid = searchParams.get("gbraid") || "";
        const wbraid = searchParams.get("wbraid") || "";
        const fbclid = searchParams.get("fbclid") || "";
        const msclkid = searchParams.get("msclkid") || "";
        const utmSource = searchParams.get("utm_source") || "";
        const utmMedium = searchParams.get("utm_medium") || "";
        const utmCampaign = searchParams.get("utm_campaign") || "";
        const utmTerm = searchParams.get("utm_term") || searchParams.get("keyword") || "";
        const utmContent = searchParams.get("utm_content") || "";

        const hasAdOrUtm = Boolean(
            gclid || gbraid || wbraid || fbclid || msclkid || utmSource || utmCampaign
        );

        const existingLanding = safeGetStorage(STORAGE_KEYS.LANDING_URL);

        // Record if this is a fresh session OR if a new paid click arrived
        if (!existingLanding || hasAdOrUtm) {
            safeSetStorage(STORAGE_KEYS.LANDING_URL, window.location.href);
            safeSetStorage(STORAGE_KEYS.FULL_QUERY, window.location.search);
            safeSetStorage(STORAGE_KEYS.LANDING_TIME, new Date().toISOString());

            const rawReferrer = document.referrer;
            if (rawReferrer && !rawReferrer.includes(window.location.hostname)) {
                safeSetStorage(STORAGE_KEYS.REFERRER, rawReferrer);
            } else if (!safeGetStorage(STORAGE_KEYS.REFERRER)) {
                safeSetStorage(STORAGE_KEYS.REFERRER, rawReferrer ? "Internal Navigation" : "Direct / None");
            }

            if (gclid) safeSetStorage(STORAGE_KEYS.GCLID, gclid);
            if (gbraid) safeSetStorage(STORAGE_KEYS.GBRAID, gbraid);
            if (wbraid) safeSetStorage(STORAGE_KEYS.WBRAID, wbraid);
            if (fbclid) safeSetStorage(STORAGE_KEYS.FBCLID, fbclid);
            if (msclkid) safeSetStorage(STORAGE_KEYS.MSCLKID, msclkid);
            if (utmSource) safeSetStorage(STORAGE_KEYS.UTM_SOURCE, utmSource);
            if (utmMedium) safeSetStorage(STORAGE_KEYS.UTM_MEDIUM, utmMedium);
            if (utmCampaign) safeSetStorage(STORAGE_KEYS.UTM_CAMPAIGN, utmCampaign);
            if (utmTerm) safeSetStorage(STORAGE_KEYS.UTM_TERM, utmTerm);
            if (utmContent) safeSetStorage(STORAGE_KEYS.UTM_CONTENT, utmContent);
        }
    } catch (err) {
        console.warn("Error initializing lead attribution:", err);
    }
}

/**
 * Determine a high-level human readable source category
 */
export function determineSourceSummary(data: {
    gclid?: string;
    gbraid?: string;
    wbraid?: string;
    fbclid?: string;
    msclkid?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    referrer?: string;
    landingUrl?: string;
}): string {
    const { gclid, gbraid, wbraid, fbclid, msclkid, utmSource, utmMedium, utmCampaign, referrer, landingUrl } = data;

    if (gclid || gbraid || wbraid || (utmSource?.toLowerCase() === "google" && (utmMedium?.toLowerCase() === "cpc" || utmMedium?.toLowerCase() === "paid"))) {
        return `Google Ads (Paid Search)${utmCampaign ? ` - [${utmCampaign}]` : ""}`;
    }

    if (fbclid || utmSource?.toLowerCase() === "facebook" || utmSource?.toLowerCase() === "meta" || utmSource?.toLowerCase() === "instagram") {
        return `Meta / Facebook Ads${utmCampaign ? ` - [${utmCampaign}]` : ""}`;
    }

    if (msclkid || (utmSource?.toLowerCase() === "bing" && utmMedium?.toLowerCase() === "cpc")) {
        return `Bing Ads (Paid Search)${utmCampaign ? ` - [${utmCampaign}]` : ""}`;
    }

    if (landingUrl && (landingUrl.includes("/landing") || landingUrl.includes("/solar-cleaning") || landingUrl.includes("/gutter-cleaning") || landingUrl.includes("/pressure-cleaning"))) {
        // If they landed directly on our dedicated ads landing page without stripped params
        if (gclid) return "Google Ads Landing Page";
    }

    if (referrer && referrer !== "Direct / None" && referrer !== "Internal Navigation") {
        try {
            const refUrl = new URL(referrer);
            const host = refUrl.hostname.toLowerCase();
            if (host.includes("google.")) return "Google Organic Search";
            if (host.includes("bing.")) return "Bing Organic Search";
            if (host.includes("yahoo.")) return "Yahoo Organic Search";
            if (host.includes("duckduckgo.")) return "DuckDuckGo Organic Search";
            if (host.includes("hipages.")) return "Hipages Referral";
            if (host.includes("facebook.")) return "Facebook Referral";
            if (host.includes("instagram.")) return "Instagram Referral";
            return `Referral (${host})`;
        } catch {
            // Keep going
        }
    }

    if (utmSource) {
        return `${utmSource}${utmMedium ? ` / ${utmMedium}` : ""}${utmCampaign ? ` - [${utmCampaign}]` : ""}`;
    }

    return "Direct Visit / Organic";
}

/**
 * Returns complete standardized attribution to attach to any form submission.
 * Guaranteed to never return empty strings for landingUrl, submissionUrl, or sourceSummary.
 */
export function getLeadAttribution(formName = "Website Form"): LeadAttribution {
    if (typeof window === "undefined") {
        return {
            landingUrl: "https://aspectwindowcleaning.com.au",
            submissionUrl: "https://aspectwindowcleaning.com.au",
            referrer: "Direct / Server",
            fullQuery: "",
            sourceSummary: "Server Direct",
            formName,
            device: "Desktop",
        };
    }

    // Ensure storage is initialized
    initAttribution();

    const submissionUrl = window.location.href;
    const landingUrl = safeGetStorage(STORAGE_KEYS.LANDING_URL) || submissionUrl;
    const referrer = safeGetStorage(STORAGE_KEYS.REFERRER) || document.referrer || "Direct / None";
    const fullQuery = safeGetStorage(STORAGE_KEYS.FULL_QUERY) || window.location.search || "";
    const gclid = safeGetStorage(STORAGE_KEYS.GCLID) || undefined;
    const gbraid = safeGetStorage(STORAGE_KEYS.GBRAID) || undefined;
    const wbraid = safeGetStorage(STORAGE_KEYS.WBRAID) || undefined;
    const fbclid = safeGetStorage(STORAGE_KEYS.FBCLID) || undefined;
    const msclkid = safeGetStorage(STORAGE_KEYS.MSCLKID) || undefined;
    const utmSource = safeGetStorage(STORAGE_KEYS.UTM_SOURCE) || undefined;
    const utmMedium = safeGetStorage(STORAGE_KEYS.UTM_MEDIUM) || undefined;
    const utmCampaign = safeGetStorage(STORAGE_KEYS.UTM_CAMPAIGN) || undefined;
    const utmTerm = safeGetStorage(STORAGE_KEYS.UTM_TERM) || undefined;
    const utmContent = safeGetStorage(STORAGE_KEYS.UTM_CONTENT) || undefined;
    const landingTime = safeGetStorage(STORAGE_KEYS.LANDING_TIME) || new Date().toISOString();
    const device = detectDevice();

    const sourceSummary = determineSourceSummary({
        gclid,
        gbraid,
        wbraid,
        fbclid,
        msclkid,
        utmSource,
        utmMedium,
        utmCampaign,
        referrer,
        landingUrl,
    });

    return {
        landingUrl,
        submissionUrl,
        referrer,
        fullQuery,
        sourceSummary,
        formName,
        gclid,
        gbraid,
        wbraid,
        fbclid,
        msclkid,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
        device,
        landingTime,
    };
}
