import { Shape } from "@/data/shapes";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ShapeCardProps {
    shape: Shape;
    language: "en" | "ur";
    onClick: (shape: Shape) => void;
}

export function ShapeCard({ shape, language, onClick }: ShapeCardProps) {
    const isUrdu = language === "ur";

    return (
        <Card
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 overflow-hidden group"
            onClick={() => onClick(shape)}
        >
            <CardContent className="p-6 flex items-center justify-center h-48 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                {shape.visualParams.path ? (
                    <svg
                        viewBox={shape.visualParams.viewBox || "0 0 100 100"}
                        className={cn("w-32 h-32 drop-shadow-lg transition-transform duration-500 group-hover:rotate-3", shape.visualParams.color)}
                    >
                        <path d={shape.visualParams.path} />
                    </svg>
                ) : (
                    <div
                        className={cn(
                            "transition-transform duration-500 group-hover:rotate-3 shadow-lg",
                            shape.visualParams.cssClass,
                            shape.visualParams.color
                        )}
                    />
                )}
            </CardContent>
            <CardFooter className={cn("p-4 flex justify-between items-center bg-white dark:bg-slate-950", isUrdu ? "flex-row-reverse" : "")}>
                <div className={cn(isUrdu ? "text-right" : "text-left")}>
                    <h3 className={cn("font-bold text-lg text-slate-900 dark:text-slate-100", isUrdu ? "font-serif" : "")}>
                        {isUrdu ? shape.nameUr : shape.name}
                    </h3>
                    <p className={cn("text-xs text-slate-500 dark:text-slate-400", isUrdu ? "font-serif" : "")}>
                        {isUrdu ? shape.typeUr : shape.type}
                    </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isUrdu ? "rotate-180" : ""}>
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </div>
            </CardFooter>
        </Card>
    );
}

