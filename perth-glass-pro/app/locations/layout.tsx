import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Service Areas",
    description: "View all the Perth suburbs and locations serviced by Aspect Window Cleaning. Find your local professional window cleaner.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
