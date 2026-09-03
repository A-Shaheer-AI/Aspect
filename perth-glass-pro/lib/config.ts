// ===========================================
// Site Configuration Constants
// ===========================================

// Cal.com Booking Links
export const CAL_LINK = "aspect-window-cleaning/booking";
export const CAL_COMMERCIAL_LINK = "aspect-window-cleaning/commercial-quote";

// Cal.com Styling
export const CAL_BRAND_COLOR = "#D4AF37";

// Business Information
export const BUSINESS = {
    name: "Aspect Window Cleaning",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "0426 996 192",
    phoneRaw: "+61426996192",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@aspectwindowcleaning.com.au",
    location: "183 Stirling Hwy, Nedlands WA 6009",
    insurance: "$20M Public Liability",
    google: process.env.NEXT_PUBLIC_GMB_URL || "https://g.page/your-business",
} as const;

// Social Links (add when ready)
export const SOCIAL = {
    google: "https://g.page/your-business",
    facebook: "",
    instagram: "",
} as const;
