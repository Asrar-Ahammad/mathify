"use client";

import { useState } from "react";
import { graphTypes, GraphType } from "@/data/graphs";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Graphs() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGraph, setSelectedGraph] = useState<GraphType | null>(null);
    const { language, isUrdu, fontScale, setFontScale } = useApp();

    const handleIncreaseFont = () => setFontScale(prev => Math.min(prev + 0.1, 1.5));
    const handleDecreaseFont = () => setFontScale(prev => Math.max(prev - 0.1, 0.75));
    const handleResetFont = () => setFontScale(1);

    const filteredGraphs = graphTypes.filter((graph) => {
        const name = isUrdu ? graph.nameUr : graph.name;
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative w-full md:w-96">
                            <div className={cn("absolute inset-y-0 flex items-center pointer-events-none text-slate-400", isUrdu ? "right-0 pr-3" : "left-0 pl-3")}>
                                <Search className="h-4 w-4" />
                            </div>
                            <Input
                                type="text"
                                placeholder={isUrdu ? "گراف تلاش کریں..." : "Search graphs..."}
                                className={cn(
                                    "bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all duration-300",
                                    isUrdu ? "pr-10 text-right font-serif" : "pl-10"
                                )}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                dir={isUrdu ? "rtl" : "ltr"}
                            />
                        </div>

                        <Link href="/graphs/plotter">
                            <Button className="w-full md:w-auto">
                                {isUrdu ? "انٹرایکٹو پلاٹر" : "Interactive Plotter"}
                            </Button>
                        </Link>
                    </div>

                    <div className={cn(isUrdu ? "text-right" : "text-left")}>
                        <h2 className={cn("text-3xl font-bold mb-2", isUrdu ? "font-serif" : "")}>
                            {isUrdu ? "ریاضیاتی گرافس" : "Mathematical Graphs"}
                        </h2>
                        <p className={cn("text-slate-500 dark:text-slate-400 max-w-2xl", isUrdu ? "ml-auto font-serif" : "")}>
                            {isUrdu
                                ? "مختلف قسم کے ریاضیاتی گرافس کو دریافت کریں۔ کسی بھی گراف پر کلک کریں تاکہ اس کی مساوات اور خصوصیات جان سکیں۔"
                                : "Explore different types of mathematical graphs. Click on any graph to learn about its equation and properties."
                            }
                        </p>
                    </div>
                </div>

                {filteredGraphs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" dir={isUrdu ? "rtl" : "ltr"}>
                        {filteredGraphs.map((graph) => (
                            <Card
                                key={graph.id}
                                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 overflow-hidden group"
                                onClick={() => setSelectedGraph(graph)}
                            >
                                <CardContent className="p-6 flex items-center justify-center h-48 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                                    <div className="text-4xl font-mono font-bold text-slate-700 dark:text-slate-300">
                                        {graph.equation}
                                    </div>
                                </CardContent>
                                <CardFooter className={cn("p-4 flex justify-between items-center bg-white dark:bg-slate-950", isUrdu ? "flex-row-reverse" : "")}>
                                    <div className={cn(isUrdu ? "text-right" : "text-left")}>
                                        <h3 className={cn("font-bold text-lg text-slate-900 dark:text-slate-100", isUrdu ? "font-serif" : "")}>
                                            {isUrdu ? graph.nameUr : graph.name}
                                        </h3>
                                        <p className={cn("text-xs text-slate-500 dark:text-slate-400", isUrdu ? "font-serif" : "")}>
                                            {isUrdu ? graph.typeUr : graph.type}
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
                            {isUrdu ? "کوئی گراف نہیں ملا" : "No graphs found"}
                        </h3>
                        <p className={cn("text-slate-500 dark:text-slate-400", isUrdu ? "font-serif" : "")}>
                            {isUrdu
                                ? `ہمیں "${searchTerm}" سے مطابقت رکھنے والا کوئی گراف نہیں ملا۔`
                                : `We couldn't find any graphs matching "${searchTerm}".`
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedGraph && (
                <Dialog open={!!selectedGraph} onOpenChange={() => setSelectedGraph(null)}>
                    <DialogContent className="sm:max-w-[900px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-slate-200 dark:border-slate-800">
                        <DialogHeader className={cn(isUrdu ? "text-right" : "text-left")}>
                            <DialogTitle className={cn("text-2xl font-bold flex items-center gap-2", isUrdu ? "flex-row-reverse font-serif" : "")}>
                                {isUrdu ? selectedGraph.nameUr : selectedGraph.name}
                                <span className={cn("text-sm font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full", isUrdu ? "font-serif" : "")}>
                                    {isUrdu ? selectedGraph.typeUr : selectedGraph.type}
                                </span>
                            </DialogTitle>
                            <DialogDescription className={cn("text-base pt-2", isUrdu ? "text-right font-serif" : "text-left")}>
                                {isUrdu ? selectedGraph.descriptionUr : selectedGraph.description}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            {/* Graph Preview */}
                            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
                                <h4 className={cn("font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3", isUrdu ? "text-right font-serif" : "text-left")}>
                                    {isUrdu ? "گراف پیش منظر" : "Graph Preview"}
                                </h4>
                                <div className="w-full h-[300px] bg-white dark:bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: selectedGraph.visualParams.svg }}
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-6">
                                <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
                                    <h4 className={cn("font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3", isUrdu ? "text-right font-serif" : "text-left")}>
                                        {isUrdu ? "عام مساوات" : "General Equation"}
                                    </h4>
                                    <code className="text-2xl font-mono font-semibold text-primary block text-center">
                                        {selectedGraph.equation}
                                    </code>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
                                    <h4 className={cn("font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3", isUrdu ? "text-right font-serif" : "text-left")}>
                                        {isUrdu ? "مثال" : "Example"}
                                    </h4>
                                    <code className="text-xl font-mono font-semibold text-slate-700 dark:text-slate-300 block text-center">
                                        {selectedGraph.example}
                                    </code>
                                </div>

                                <div>
                                    <h4 className={cn("font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3", isUrdu ? "text-right font-serif" : "text-left")}>
                                        {isUrdu ? "خصوصیات" : "Properties"}
                                    </h4>
                                    <ul className="space-y-2 text-sm">
                                        <li className={cn("flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2", isUrdu ? "flex-row-reverse" : "")}>
                                            <span className={cn("text-slate-600 dark:text-slate-400", isUrdu ? "font-serif" : "")}>{isUrdu ? "ڈومین" : "Domain"}</span>
                                            <span className="font-medium font-mono">{selectedGraph.properties.domain}</span>
                                        </li>
                                        <li className={cn("flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2", isUrdu ? "flex-row-reverse" : "")}>
                                            <span className={cn("text-slate-600 dark:text-slate-400", isUrdu ? "font-serif" : "")}>{isUrdu ? "رینج" : "Range"}</span>
                                            <span className="font-medium font-mono">{selectedGraph.properties.range}</span>
                                        </li>
                                        <li className={cn("flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2", isUrdu ? "flex-row-reverse" : "")}>
                                            <span className={cn("text-slate-600 dark:text-slate-400", isUrdu ? "font-serif" : "")}>{isUrdu ? "شکل" : "Shape"}</span>
                                            <span className={cn("font-medium", isUrdu ? "font-serif" : "")}>
                                                {isUrdu ? selectedGraph.properties.shapeUr : selectedGraph.properties.shape}
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
