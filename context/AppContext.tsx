
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ur";

interface AppContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    fontScale: number;
    setFontScale: (scale: number | ((prev: number) => number)) => void;
    isUrdu: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    const [fontScale, setFontScale] = useState(1);

    const isUrdu = language === "ur";

    useEffect(() => {
        document.documentElement.style.fontSize = `${100 * fontScale}%`;
        document.documentElement.dir = isUrdu ? "rtl" : "ltr";
        document.documentElement.lang = language;
    }, [fontScale, isUrdu, language]);

    return (
        <AppContext.Provider value={{ language, setLanguage, fontScale, setFontScale, isUrdu }}>
            <div className={isUrdu ? "font-serif" : "font-sans"}>
                {children}
            </div>
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
