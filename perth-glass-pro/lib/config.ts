// ===========================================
// Site Configuration Constants
// ===========================================

// Cal.com Booking Links
export const CAL_LINK = "aspect-window-cleaning/windowcleaning";
export const CAL_COMMERCIAL_LINK = "aspect-window-cleaning/windowcleaning";

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
    google: process.env.NEXT_PUBLIC_GMB_URL || "https://www.google.com/search?sca_esv=1b9fc756e6c3b46d&sxsrf=ANbL-n6zEVWGGouQLHhAHvXkK_H88Y85eQ%3A1774365099118&q=Aspect%20Window%20Cleaning&stick=H4sIAAAAAAAAAONgU1I1qEhMS0pKMU82TkkxtTQ0tDC2MqhINbMwTrZINE81NzI0MjMzWcQq5lhckJpcohCemZeSX67gnJOamJeZlw4AhdV9Q0IAAAA&mat=CVbIX9UY0WAb&ved=2ahUKEwjQ5ryL6biTAxVNT2wGHWtDIZsQrMcEegQIHxAC",
} as const;

// Social Links (add when ready)
export const SOCIAL = {
    google: "https://g.page/your-business",
    facebook: "",
    instagram: "",
} as const;
