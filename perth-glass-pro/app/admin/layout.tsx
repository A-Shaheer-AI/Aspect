import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Portal",
    description: "Aspect Window Cleaning administrative portal.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
