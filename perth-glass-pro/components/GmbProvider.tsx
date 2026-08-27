"use client";

import React, { createContext, useContext } from "react";

const defaultGmb = { rating: 5.0, reviewCount: "40+", address: "183 Stirling Hwy, Nedlands WA 6009" };
export const GmbContext = createContext(defaultGmb);

export const useGmb = () => useContext(GmbContext);

export default function GmbProvider({ children, value }: { children: React.ReactNode, value: any }) {
    return <GmbContext.Provider value={value}>{children}</GmbContext.Provider>;
}
