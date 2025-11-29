"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { FontSizeToggle } from "@/components/FontSizeToggle";
import { Card } from "@/components/ui/card";

interface CalculationStep {
    position: number;
    operation: string;
    value: number;
    description: string;
}

export default function Calculator() {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState<number | null>(null);
    const [steps, setSteps] = useState<string[]>([]);
    const [calculationSteps, setCalculationSteps] = useState<CalculationStep[]>([]);
    const [animationStep, setAnimationStep] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { language, isUrdu, fontScale, setFontScale } = useApp();

    const handleIncreaseFont = () => setFontScale(prev => Math.min(prev + 0.1, 1.5));
    const handleDecreaseFont = () => setFontScale(prev => Math.max(prev - 0.1, 0.75));
    const handleResetFont = () => setFontScale(1);

    // Parse expression and create calculation steps
    const parseExpression = (expr: string): CalculationStep[] => {
        const cleanExpr = expr.replace(/\s/g, '');
        const steps: CalculationStep[] = [];

        // Parse expression manually to handle negative numbers correctly
        let tokens: string[] = [];
        let currentNumber = '';
        let isFirstToken = true;

        for (let i = 0; i < cleanExpr.length; i++) {
            const char = cleanExpr[i];

            if (char === '+' || char === '-' || char === '*' || char === '/') {
                // Check if this minus is a negative sign (at start or after an operator)
                if (char === '-' && (isFirstToken || ['+', '-', '*', '/'].includes(cleanExpr[i - 1]))) {
                    currentNumber += char;
                } else {
                    // It's an operator
                    if (currentNumber) {
                        tokens.push(currentNumber);
                        currentNumber = '';
                        isFirstToken = false;
                    }
                    tokens.push(char);
                }
            } else {
                currentNumber += char;
            }
        }

        if (currentNumber) {
            tokens.push(currentNumber);
        }

        if (tokens.length === 0) return steps;

        const firstToken = tokens[0];
        if (!firstToken) return steps;

        let currentPos = parseFloat(firstToken);
        steps.push({
            position: currentPos,
            operation: "start",
            value: currentPos,
            description: isUrdu ? `شروع: ${currentPos}` : `Start: ${currentPos}`
        });

        // Process remaining tokens (operator, number pairs)
        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const nextToken = tokens[i + 1];

            if (!operator || !nextToken) continue;

            const value = parseFloat(nextToken);

            let newPos = currentPos;
            let opDesc = "";

            switch (operator) {
                case '+':
                    newPos = currentPos + value;
                    opDesc = isUrdu ? `${value} جمع کریں` : `Add ${value}`;
                    break;
                case '-':
                    newPos = currentPos - value;
                    opDesc = isUrdu ? `${value} منہا کریں` : `Subtract ${value}`;
                    break;
                case '*':
                    newPos = currentPos * value;
                    opDesc = isUrdu ? `${value} سے ضرب دیں` : `Multiply by ${value}`;
                    break;
                case '/':
                    newPos = currentPos / value;
                    opDesc = isUrdu ? `${value} سے تقسیم کریں` : `Divide by ${value}`;
                    break;
            }

            steps.push({
                position: newPos,
                operation: operator,
                value: value,
                description: `${opDesc} → ${newPos}`
            });

            currentPos = newPos;
        }

        return steps;
    };

    //Simple expression evaluator with step tracking
    const solveExpression = (expr: string) => {
        try {
            const cleanExpr = expr.replace(/\s/g, '');

            if (!/^[\d+\-*/().]+$/.test(cleanExpr)) {
                throw new Error("Invalid expression");
            }

            const textSteps: string[] = [];
            textSteps.push(`${isUrdu ? "اظہار" : "Expression"}: ${cleanExpr}`);

            const finalResult = eval(cleanExpr);
            textSteps.push(`${isUrdu ? "نتیجہ" : "Result"}: ${finalResult}`);

            const calcSteps = parseExpression(cleanExpr);

            setSteps(textSteps);
            setCalculationSteps(calcSteps);
            setResult(finalResult);
            setAnimationStep(0);
            setCurrentPosition(calcSteps.length > 0 ? calcSteps[0].position : 0);
            setIsAnimating(true);

        } catch (error) {
            setSteps([isUrdu ? "غلط اظہار" : "Invalid expression"]);
            setCalculationSteps([]);
            setResult(null);
        }
    };

    // Animate through calculation steps with incremental movement
    useEffect(() => {
        if (!isAnimating || animationStep >= calculationSteps.length) {
            if (animationStep >= calculationSteps.length && isAnimating) {
                setIsAnimating(false);
            }
            return;
        }

        const targetPos = calculationSteps[animationStep].position;
        const startPos = animationStep === 0
            ? (calculationSteps[0]?.position ?? 0)
            : calculationSteps[animationStep - 1].position;
        const distance = Math.abs(targetPos - startPos);

        // If distance is 0, just move to next step
        if (distance === 0) {
            setTimeout(() => {
                setAnimationStep(prev => prev + 1);
            }, 500);
            return;
        }

        // Determine step size based on distance
        let stepSize = 1;
        if (distance > 100) {
            stepSize = 10;
        } else if (distance > 20) {
            stepSize = 2;
        }

        // Calculate number of steps and speed
        const numSteps = Math.ceil(distance / stepSize);
        const stepDelay = Math.min(5000 / Math.max(numSteps, 1), 400); // Slower: max 400ms per step

        let currentStep = 0;
        const direction = targetPos > startPos ? 1 : -1;
        let animationComplete = false;

        const interval = setInterval(() => {
            if (animationComplete) return;

            currentStep++;
            const newPos = startPos + (direction * stepSize * currentStep);

            // Check if we've reached or passed the target
            if ((direction > 0 && newPos >= targetPos) || (direction < 0 && newPos <= targetPos)) {
                setCurrentPosition(targetPos);
                animationComplete = true;
                clearInterval(interval);

                // Move to next animation step after a pause
                setTimeout(() => {
                    setAnimationStep(prev => prev + 1);
                }, 1000);
            } else {
                setCurrentPosition(newPos);
            }
        }, stepDelay);

        return () => {
            animationComplete = true;
            clearInterval(interval);
        };
    }, [isAnimating, animationStep, calculationSteps]);

    const handleCalculate = () => {
        if (expression.trim()) {
            solveExpression(expression);
        }
    };

    const generateNumberLine = () => {
        if (result === null) return [];

        // Use current position during animation, final result when done
        const centerValue = isAnimating ? Math.round(currentPosition) : Math.round(result);
        const min = centerValue - 4;
        const max = centerValue + 4;
        const points = [];

        for (let i = min; i <= max; i++) {
            points.push(i);
        }

        return points;
    };

    const numberLinePoints = generateNumberLine();

    return (
        <>
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className={cn("mb-8", isUrdu ? "text-right" : "text-left")}>
                    <h2 className={cn("text-3xl font-bold mb-2", isUrdu ? "font-serif" : "")}>
                        {isUrdu ? "ریاضیاتی کیلکولیٹر" : "Arithmetic Calculator"}
                    </h2>
                    <p className={cn("text-slate-500 dark:text-slate-400 max-w-2xl", isUrdu ? "ml-auto font-serif" : "")}>
                        {isUrdu
                            ? "کوئی بھی ریاضیاتی اظہار درج کریں اور نمبر لائن پر حل دیکھیں۔"
                            : "Enter any arithmetic expression and see the solution visualized on a number line."
                        }
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800">
                            <h3 className={cn("font-bold text-lg mb-4", isUrdu ? "text-right font-serif" : "text-left")}>
                                {isUrdu ? "اظہار درج کریں" : "Enter Expression"}
                            </h3>

                            <div className="space-y-4">
                                <Input
                                    type="text"
                                    value={expression}
                                    onChange={(e) => setExpression(e.target.value)}
                                    placeholder={isUrdu ? "مثال: 5 + 3" : "e.g., 5 + 3"}
                                    className={cn("font-mono text-lg", isUrdu ? "text-right" : "text-left")}
                                    dir="ltr"
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            handleCalculate();
                                        }
                                    }}
                                />

                                <Button onClick={handleCalculate} className="w-full" size="lg">
                                    {isUrdu ? "حل کریں" : "Calculate"}
                                </Button>

                                {result !== null && (
                                    <div className="bg-primary/10 border-2 border-primary rounded-lg p-4">
                                        <p className={cn("text-sm text-slate-600 dark:text-slate-400 mb-1", isUrdu ? "text-right font-serif" : "text-left")}>
                                            {isUrdu ? "نتیجہ" : "Result"}
                                        </p>
                                        <p className="text-3xl font-bold text-primary text-center font-mono">
                                            {result}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Examples */}
                        <Card className="p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800">
                            <h3 className={cn("font-bold text-lg mb-4", isUrdu ? "text-right font-serif" : "text-left")}>
                                {isUrdu ? "مثالیں" : "Examples"}
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {["5 + 3", "10 - 4", "6 + 2", "15 - 7"].map((example) => (
                                    <Button
                                        key={example}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setExpression(example);
                                            solveExpression(example);
                                        }}
                                        className="font-mono justify-start"
                                    >
                                        {example}
                                    </Button>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Number Line Visualization */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800">
                            <h3 className={cn("font-bold text-lg mb-6", isUrdu ? "text-right font-serif" : "text-left")}>
                                {isUrdu ? "نمبر لائن" : "Number Line"}
                            </h3>

                            {result !== null ? (
                                <div className="relative">
                                    {calculationSteps.length > 0 && animationStep > 0 && animationStep <= calculationSteps.length && (
                                        <div className="mb-4 p-3 bg-primary/10 border-2 border-primary rounded-lg text-center">
                                            <p className="font-semibold text-primary">
                                                {calculationSteps[animationStep - 1]?.description}
                                            </p>
                                        </div>
                                    )}

                                    <div className="overflow-x-auto pb-4">
                                        <div className="min-w-[600px] relative h-40">
                                            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-300 dark:bg-slate-700" />

                                            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                                                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-slate-300 dark:border-l-slate-700 border-b-8 border-b-transparent" />
                                            </div>

                                            {numberLinePoints.map((num) => {
                                                const position = ((num - numberLinePoints[0]) / (numberLinePoints[numberLinePoints.length - 1] - numberLinePoints[0])) * 90 + 5;
                                                const isResult = num === Math.round(result);
                                                const isCurrentPosition = Math.abs(num - currentPosition) < 0.5;

                                                return (
                                                    <div
                                                        key={num}
                                                        className="absolute top-1/2 transform -translate-x-1/2"
                                                        style={{ left: `${position}%` }}
                                                    >
                                                        <div className={cn(
                                                            "w-px bg-slate-400 dark:bg-slate-600 mx-auto",
                                                            isResult ? "h-8 -translate-y-4" : "h-4 -translate-y-2"
                                                        )} />

                                                        <div className={cn(
                                                            "text-xs mt-2 font-mono text-center whitespace-nowrap",
                                                            isResult ? "font-bold text-primary text-base" : "text-slate-600 dark:text-slate-400"
                                                        )}>
                                                            {num}
                                                        </div>

                                                        {isCurrentPosition && isAnimating && (
                                                            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 transition-all duration-400">
                                                                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                                                                    {currentPosition.toFixed(0)}
                                                                </div>
                                                                <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-green-500 mx-auto" />
                                                            </div>
                                                        )}

                                                        {isResult && !isAnimating && (
                                                            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 animate-bounce">
                                                                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                                                    {isUrdu ? "نتیجہ" : "Result"}
                                                                </div>
                                                                <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-primary mx-auto" />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                        <p className={cn(isUrdu ? "font-serif" : "")}>
                                            {isUrdu
                                                ? isAnimating ? "حساب کی تصویری نمائش" : "نتیجہ نمبر لائن پر نشان زد ہے"
                                                : isAnimating ? "Watch the calculation visualized step by step" : "The result is marked on the number line above"
                                            }
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-3xl">📊</span>
                                    </div>
                                    <p className={cn("text-slate-500 dark:text-slate-400", isUrdu ? "font-serif" : "")}>
                                        {isUrdu
                                            ? "نمبر لائن دیکھنے کے لیے ایک اظہار حل کریں"
                                            : "Solve an expression to see the number line"
                                        }
                                    </p>
                                </div>
                            )}
                        </Card>
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
