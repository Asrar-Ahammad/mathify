
import { Shape } from "@/data/shapes";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ShapeModalProps {
    shape: Shape | null;
    isOpen: boolean;
    onClose: () => void;
    language: "en" | "ur";
}

export function ShapeModal({ shape, isOpen, onClose, language }: ShapeModalProps) {
    if (!shape) return null;
    const isUrdu = language === "ur";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-slate-200 dark:border-slate-800">
                <DialogHeader className={cn(isUrdu ? "text-right" : "text-left")}>
                    <DialogTitle className={cn("text-2xl font-bold flex items-center gap-2", isUrdu ? "flex-row-reverse font-serif" : "")}>
                        {isUrdu ? shape.nameUr : shape.name}
                        <span className={cn("text-sm font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full", isUrdu ? "font-serif" : "")}>
                            {isUrdu ? shape.typeUr : shape.type}
                        </span>
                    </DialogTitle>
                    <DialogDescription className={cn("text-base pt-2", isUrdu ? "text-right font-serif" : "text-left")}>
                        {isUrdu ? shape.descriptionUr : shape.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    {/* Visual Representation */}
                    <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-xl p-8 border border-slate-100 dark:border-slate-800">
                        {shape.visualParams.path ? (
                            <svg
                                viewBox={shape.visualParams.viewBox || "0 0 100 100"}
                                className={cn("w-40 h-40 drop-shadow-xl", shape.visualParams.color)}
                            >
                                <path d={shape.visualParams.path} />
                            </svg>
                        ) : (
                            <div
                                className={cn(
                                    "shadow-xl",
                                    shape.visualParams.cssClass,
                                    shape.visualParams.color
                                )}
                            />
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <h4 className={cn("font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3", isUrdu ? "text-right font-serif" : "text-left")}>
                                {isUrdu ? "فارمولے" : "Formulas"}
                            </h4>
                            <div className="space-y-3">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <span className={cn("text-xs text-slate-500 block mb-1", isUrdu ? "text-right font-serif" : "text-left")}>
                                        {isUrdu ? "رقبہ" : "Area"}
                                    </span>
                                    <code className={cn("text-lg font-mono font-semibold text-primary block", isUrdu ? "text-right" : "text-left")}>{shape.formulas.area}</code>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <span className={cn("text-xs text-slate-500 block mb-1", isUrdu ? "text-right font-serif" : "text-left")}>
                                        {isUrdu ? "احاطہ" : "Perimeter"}
                                    </span>
                                    <code className={cn("text-lg font-mono font-semibold text-primary block", isUrdu ? "text-right" : "text-left")}>{shape.formulas.perimeter}</code>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className={cn("font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3", isUrdu ? "text-right font-serif" : "text-left")}>
                                {isUrdu ? "خصوصیات" : "Properties"}
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li className={cn("flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2", isUrdu ? "flex-row-reverse" : "")}>
                                    <span className={cn("text-slate-600 dark:text-slate-400", isUrdu ? "font-serif" : "")}>{isUrdu ? "اطراف" : "Sides"}</span>
                                    <span className="font-medium">{shape.properties.sides}</span>
                                </li>
                                <li className={cn("flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2", isUrdu ? "flex-row-reverse" : "")}>
                                    <span className={cn("text-slate-600 dark:text-slate-400", isUrdu ? "font-serif" : "")}>{isUrdu ? "زاویے" : "Angles"}</span>
                                    <span className={cn("font-medium max-w-[60%]", isUrdu ? "text-left font-serif" : "text-right")}>
                                        {isUrdu ? shape.properties.anglesUr : shape.properties.angles}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
