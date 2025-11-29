"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const { language, setLanguage, isUrdu } = useApp();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { href: "/shapes/2d", label: "2D Shapes", labelUr: "2D اشکال" },
        { href: "/shapes/3d", label: "3D Shapes", labelUr: "3D اشکال" },
        { href: "/graphs", label: "Graphs", labelUr: "گرافس" },
    ];

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
            <div className="container mx-auto px-4 py-4 max-w-7xl">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                            M
                        </div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                            Mathify
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className={cn("flex items-center gap-4", isUrdu ? "flex-row-reverse" : "")}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        pathname.startsWith(item.href)
                                            ? "text-primary font-bold"
                                            : "text-slate-500 dark:text-slate-400",
                                        isUrdu ? "font-serif" : ""
                                    )}
                                >
                                    {isUrdu ? item.labelUr : item.label}
                                </Link>
                            ))}
                        </div>

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

                        <LanguageToggle language={language} onToggle={setLanguage} />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-3">
                        <LanguageToggle language={language} onToggle={setLanguage} />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                            ) : (
                                <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-800 pt-4">
                        <div className={cn("flex flex-col gap-3", isUrdu ? "items-end" : "items-start")}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "text-base font-medium transition-colors hover:text-primary py-2 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 w-full",
                                        pathname.startsWith(item.href)
                                            ? "text-primary font-bold bg-slate-100 dark:bg-slate-800"
                                            : "text-slate-500 dark:text-slate-400",
                                        isUrdu ? "font-serif text-right" : "text-left"
                                    )}
                                >
                                    {isUrdu ? item.labelUr : item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
