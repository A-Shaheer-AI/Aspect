import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Online",
    description: "Book your window cleaning, solar panel cleaning, or pressure washing service online with Aspect Window Cleaning.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
