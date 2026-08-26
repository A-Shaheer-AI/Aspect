import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Work & Portfolio",
    description: "View our portfolio of residential and commercial window cleaning projects across Perth. See the Aspect Window Cleaning difference.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
