"use client";

import { useState } from "react";
import { shapes3D, Shape3D } from "@/data/shapes3d";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FontSizeToggle } from "@/components/FontSizeToggle";

export default function Shapes3D() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedShape, setSelectedShape] = useState<Shape3D | null>(null);
    const { language, isUrdu, fontScale, setFontScale } = useApp();

    const handleIncreaseFont = () => setFontScale(prev => Math.min(prev + 0.1, 1.5));
    const handleDecreaseFont = () => setFontScale(prev => Math.max(prev - 0.1, 0.75));
    const handleResetFont = () => setFontScale(1);

    const filteredShapes = shapes3D.filter((shape) => {
        const name = isUrdu ? shape.nameUr : shape.name;
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="mb-8">
                    <div className="relative w-full md:w-96 mb-6">
                        <div className={cn("absolute inset-y-0 flex items-center pointer-events-none text-slate-400", isUrdu ? "right-0 pr-3" : "left-0 pl-3")}>
                            <Search className="h-4 w-4" />
                        </div>
                        <Input
                            type="text"
                            placeholder={isUrdu ? "اشکال تلاش کریں..." : "Search shapes..."}
                            className={cn(
                                "bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all duration-300",
                                isUrdu ? "pr-10 text-right font-serif" : "pl-10"
                            )}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            dir={isUrdu ? "rtl" : "ltr"}
                        />
                    </div>

                    <div className={cn(isUrdu ? "text-right" : "text-left")}>
                        <h2 className={cn("text-3xl font-bold mb-2", isUrdu ? "font-serif" : "")}>
                            {isUrdu ? "3D ہندسی اشکال" : "3D Geometric Shapes"}
                        </h2>
                        <p className={cn("text-slate-500 dark:text-slate-400 max-w-2xl", isUrdu ? "ml-auto font-serif" : "")}>
                            {isUrdu
                                ? "سہ جہتی جیومیٹری کی دنیا کو دریافت کریں۔ کسی بھی شکل پر کلک کریں تاکہ اس کے حجم، گول سطح کا رقبہ، اور کل سطح کا رقبہ جان سکیں۔"
                                : "Explore the world of 3D geometry. Click on any shape to reveal volume, curved surface area, and total surface area formulas."
                            }
                        </p>
                    </div>
                </div>

                {filteredShapes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" dir={isUrdu ? "rtl" : "ltr"}>
                        {filteredShapes.map((shape) => (
                            <Card
                                key={shape.id}
                                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 overflow-hidden group"
                                onClick={() => setSelectedShape(shape)}
                            >
                                <CardContent className="p-6 flex items-center justify-center h-48 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                                    <div dangerouslySetInnerHTML={{ __html: shape.visualParams.svg }} className={cn("w-32 h-32 transition-transform duration-500 group-hover:rotate-y-12", shape.visualParams.color)} />
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
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                            <Search className="h-8 w-8" />
                        </div>
                        <h3 className={cn("text-xl font-semibold mb-2", isUrdu ? "font-serif" : "")}>
                            {isUrdu ? "کوئی شکل نہیں ملی" : "No shapes found"}
                        </h3>
                        <p className={cn("text-slate-500 dark:text-slate-400", isUrdu ? "font-serif" : "")}>
                            {isUrdu
                                ? `ہمیں "${searchTerm}" سے مطابقت رکھنے والی کوئی شکل نہیں ملی۔`
                                : `We couldn't find any shapes matching "${searchTerm}".`
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedShape && (
                <Dialog open={!!selectedShape} onOpenChange={() => setSelectedShape(null)}>
                    <DialogContent className="sm:max-w-[600px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-slate-200 dark:border-slate-800">
                        <DialogHeader className={cn(isUrdu ? "text-right" : "text-left")}>
                            <DialogTitle className={cn("text-2xl font-bold flex items-center gap-2", isUrdu ? "flex-row-reverse font-serif" : "")}>
                                {isUrdu ? selectedShape.nameUr : selectedShape.name}
                                <span className={cn("text-sm font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full", isUrdu ? "font-serif" : "")}>
                                    {isUrdu ? selectedShape.typeUr : selectedShape.type}
                                </span>
                            </DialogTitle>
                            <DialogDescription className={cn("text-base pt-2", isUrdu ? "text-right font-serif" : "text-left")}>
                                {isUrdu ? selectedShape.descriptionUr : selectedShape.description}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-xl p-8 border border-slate-100 dark:border-slate-800">
                                <div dangerouslySetInnerHTML={{ __html: selectedShape.visualParams.svg }} className={cn("w-40 h-40", selectedShape.visualParams.color)} />
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className={cn("font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3", isUrdu ? "text-right font-serif" : "text-left")}>
                                        {isUrdu ? "فارمولے" : "Formulas"}
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <span className={cn("text-xs text-slate-500 block mb-1", isUrdu ? "text-right font-serif" : "text-left")}>
                                                {isUrdu ? "حجم" : "Volume"}
                                            </span>
                                            <code className={cn("text-lg font-mono font-semibold text-primary block", isUrdu ? "text-right" : "text-left")}>{selectedShape.formulas.volume}</code>
                                        </div>
                                        {selectedShape.formulas.curvedSurfaceArea && (
                                            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                                <span className={cn("text-xs text-slate-500 block mb-1", isUrdu ? "text-right font-serif" : "text-left")}>
                                                    {isUrdu ? "گول سطح کا رقبہ" : "Curved Surface Area"}
                                                </span>
                                                <code className={cn("text-lg font-mono font-semibold text-primary block", isUrdu ? "text-right" : "text-left")}>{selectedShape.formulas.curvedSurfaceArea}</code>
                                            </div>
                                        )}
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <span className={cn("text-xs text-slate-500 block mb-1", isUrdu ? "text-right font-serif" : "text-left")}>
                                                {isUrdu ? "کل سطح کا رقبہ" : "Total Surface Area"}
                                            </span>
                                            <code className={cn("text-lg font-mono font-semibold text-primary block", isUrdu ? "text-right" : "text-left")}>{selectedShape.formulas.totalSurfaceArea}</code>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className={cn("font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3", isUrdu ? "text-right font-serif" : "text-left")}>
                                        {isUrdu ? "خصوصیات" : "Properties"}
                                    </h4>
                                    <ul className="space-y-2 text-sm">
                                        <li className={cn("flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2", isUrdu ? "flex-row-reverse" : "")}>
                                            <span className={cn("text-slate-600 dark:text-slate-400", isUrdu ? "font-serif" : "")}>{isUrdu ? "سطحیں" : "Faces"}</span>
                                            <span className="font-medium">{selectedShape.properties.faces}</span>
                                        </li>
                                        <li className={cn("flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2", isUrdu ? "flex-row-reverse" : "")}>
                                            <span className={cn("text-slate-600 dark:text-slate-400", isUrdu ? "font-serif" : "")}>{isUrdu ? "کنارے" : "Edges"}</span>
                                            <span className="font-medium">{selectedShape.properties.edges}</span>
                                        </li>
                                        <li className={cn("flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2", isUrdu ? "flex-row-reverse" : "")}>
                                            <span className={cn("text-slate-600 dark:text-slate-400", isUrdu ? "font-serif" : "")}>{isUrdu ? "رأس" : "Vertices"}</span>
                                            <span className="font-medium">{selectedShape.properties.vertices}</span>
                                        </li>
                                        <li className={cn("flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2", isUrdu ? "flex-row-reverse" : "")}>
                                            <span className={cn("text-slate-600 dark:text-slate-400", isUrdu ? "font-serif" : "")}>{isUrdu ? "تفصیلات" : "Details"}</span>
                                            <span className={cn("font-medium max-w-[60%]", isUrdu ? "text-left font-serif" : "text-right")}>
                                                {isUrdu ? selectedShape.properties.detailsUr : selectedShape.properties.details}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <FontSizeToggle
                onIncrease={handleIncreaseFont}
                onDecrease={handleDecreaseFont}
                onReset={handleResetFont}
                scale={fontScale}
            />
        </>
    );
}
