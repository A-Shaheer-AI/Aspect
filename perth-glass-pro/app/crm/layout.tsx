import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Aspect CRM | Job Operations & AI Invoicing",
  description: "Offline-first mobile CRM, job pipeline, dispatch schedule, subscription recalls, and AI invoicing for Aspect Window Cleaning Perth.",
  robots: "noindex, nofollow",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Aspect CRM"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0f172a"
};

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased select-none selection:bg-amber-200">
      {children}
    </div>
  );
}
