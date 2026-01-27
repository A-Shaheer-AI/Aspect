"use client";

import dynamic from "next/dynamic";

const CMSPage = dynamic(() => import("../../components/CMSPage"), {
    ssr: false,
    loading: () => <p>Loading Admin Panel...</p>,
});

export default function AdminPage() {
    return <CMSPage />;
}
