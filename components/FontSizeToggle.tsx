
import { Button } from "@/components/ui/button";
import { Minus, Plus, Type } from "lucide-react";

interface FontSizeToggleProps {
    onIncrease: () => void;
    onDecrease: () => void;
    onReset: () => void;
    scale: number;
}

export function FontSizeToggle({ onIncrease, onDecrease, onReset, scale }: FontSizeToggleProps) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 bg-white dark:bg-slate-900 p-2 rounded-full shadow-xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={onDecrease}
                disabled={scale <= 0.75}
                aria-label="Decrease font size"
            >
                <Minus className="h-4 w-4" />
            </Button>

            <div
                className="flex items-center justify-center w-8 h-8 cursor-pointer text-slate-600 dark:text-slate-400 font-medium text-xs select-none"
                onClick={onReset}
                title="Reset font size"
            >
                {Math.round(scale * 100)}%
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={onIncrease}
                disabled={scale >= 1.5}
                aria-label="Increase font size"
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}
