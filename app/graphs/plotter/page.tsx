"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { FontSizeToggle } from "@/components/FontSizeToggle";
import functionPlot from "function-plot";

export default function GraphPlotter() {
    const [functionInput, setFunctionInput] = useState("x^2");
    const [error, setError] = useState("");
    const graphRef = useRef<HTMLDivElement>(null);
    const { language, isUrdu, fontScale, setFontScale } = useApp();

    const handleIncreaseFont = () => setFontScale(prev => Math.min(prev + 0.1, 1.5));
    const handleDecreaseFont = () => setFontScale(prev => Math.max(prev - 0.1, 0.75));
    const handleResetFont = () => setFontScale(1);

    const plotGraph = () => {
        if (!graphRef.current) return;

        setError("");
        graphRef.current.innerHTML = "";

        try {
            functionPlot({
                target: graphRef.current,
                width: graphRef.current.offsetWidth,
                height: 500,
                yAxis: { domain: [-10, 10] },
                xAxis: { domain: [-10, 10] },
                grid: true,
                data: [
                    {
                        fn: functionInput,
                        color: "#3b82f6",
                    },
                ],
            });
        } catch (err: any) {
            setError(isUrdu ? "غلط فنکشن۔ براہ کرم درست فنکشن درج کریں۔" : "Invalid function. Please enter a valid function.");
            console.error(err);
        }
    };

    useEffect(() => {
        plotGraph();
    }, []);

    const examples = [
        { label: "Linear", labelUr: "لکیری", fn: "2*x + 3" },
        { label: "Quadratic", labelUr: "مربعی", fn: "x^2 - 4*x + 3" },
        { label: "Cubic", labelUr: "مکعبی", fn: "x^3 - 3*x^2 + 2" },
        { label: "Sine", labelUr: "سائن", fn: "sin(x)" },
        { label: "Cosine", labelUr: "کوسائن", fn: "cos(x)" },
        { label: "Exponential", labelUr: "تاثیری", fn: "exp(x/2)" },
    ];

    return (
        <>
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className={cn("mb-8", isUrdu ? "text-right" : "text-left")}>
                    <h2 className={cn("text-3xl font-bold mb-2", isUrdu ? "font-serif" : "")}>
                        {isUrdu ? "انٹرایکٹو گراف پلاٹر" : "Interactive Graph Plotter"}
                    </h2>
                    <p className={cn("text-slate-500 dark:text-slate-400 max-w-2xl", isUrdu ? "ml-auto font-serif" : "")}>
                        {isUrdu
                            ? "کوئی بھی ریاضیاتی فنکشن درج کریں اور اس کا گراف دیکھیں۔"
                            : "Enter any mathematical function and see its graph plotted in real-time."
                        }
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Graph Display */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6">
                            <div
                                ref={graphRef}
                                className="w-full h-[500px] bg-slate-50 dark:bg-slate-950 rounded-lg overflow-hidden"
                            />
                            {error && (
                                <div className={cn("mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm", isUrdu ? "text-right font-serif" : "text-left")}>
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6">
                            <h3 className={cn("font-bold text-lg mb-4", isUrdu ? "text-right font-serif" : "text-left")}>
                                {isUrdu ? "فنکشن داخل کریں" : "Enter Function"}
                            </h3>

                            <div className="space-y-3">
                                <Input
                                    type="text"
                                    value={functionInput}
                                    onChange={(e) => setFunctionInput(e.target.value)}
                                    placeholder="e.g., x^2 + 2*x - 1"
                                    className={cn("font-mono", isUrdu ? "text-right" : "text-left")}
                                    dir="ltr"
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            plotGraph();
                                        }
                                    }}
                                />

                                <Button onClick={plotGraph} className="w-full">
                                    {isUrdu ? "پلاٹ کریں" : "Plot Graph"}
                                </Button>
                            </div>

                            <div className="mt-6">
                                <h4 className={cn("font-semibold text-sm mb-3 text-slate-600 dark:text-slate-400", isUrdu ? "text-right font-serif" : "text-left")}>
                                    {isUrdu ? "معاونین" : "Supported Operations"}
                                </h4>
                                <ul className={cn("text-xs space-y-1 text-slate-500 dark:text-slate-400", isUrdu ? "text-right" : "text-left")}>
                                    <li className="font-mono">+ - * / (addition, subtraction, multiplication, division)</li>
                                    <li className="font-mono">^ (exponentiation: x^2)</li>
                                    <li className="font-mono">sin(x), cos(x), tan(x)</li>
                                    <li className="font-mono">sqrt(x), abs(x)</li>
                                    <li className="font-mono">log(x), exp(x)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6">
                            <h3 className={cn("font-bold text-lg mb-4", isUrdu ? "text-right font-serif" : "text-left")}>
                                {isUrdu ? "مثالیں" : "Examples"}
                            </h3>

                            <div className="grid grid-cols-2 gap-2">
                                {examples.map((example) => (
                                    <Button
                                        key={example.fn}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setFunctionInput(example.fn);
                                            setTimeout(() => plotGraph(), 100);
                                        }}
                                        className={cn("text-xs", isUrdu ? "font-serif" : "")}
                                    >
                                        {isUrdu ? example.labelUr : example.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FontSizeToggle
                onIncrease={handleIncreaseFont}
                onDecrease={handleDecreaseFont}
                onReset={handleResetFont}
                scale={fontScale}
            />
        </>
    );
}
