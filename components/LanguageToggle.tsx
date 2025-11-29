
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
    language: "en" | "ur";
    onToggle: (lang: "en" | "ur") => void;
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
    return (
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggle("en")}
                className={cn(
                    "rounded-md px-3 py-1 text-sm font-medium transition-all",
                    language === "en"
                        ? "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
            >
                English
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggle("ur")}
                className={cn(
                    "rounded-md px-3 py-1 text-sm font-medium transition-all font-serif", // Added font-serif for Urdu feel
                    language === "ur"
                        ? "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
            >
                اردو
            </Button>
        </div>
    );
}
