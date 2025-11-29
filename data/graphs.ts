
export interface GraphType {
    id: string;
    name: string;
    nameUr: string;
    type: string;
    typeUr: string;
    description: string;
    descriptionUr: string;
    equation: string;
    properties: {
        domain: string;
        range: string;
        shape: string;
        shapeUr: string;
    };
    example: string;
    visualParams: {
        color: string;
        svg: string;
    };
}

export const graphTypes: GraphType[] = [
    {
        id: "linear",
        name: "Linear Graph",
        nameUr: "لکیری گراف",
        type: "Polynomial",
        typeUr: "کثیر الحدود",
        description: "A straight line graph representing a linear relationship between variables.",
        descriptionUr: "ایک سیدھی لکیر کا گراف جو متغیرات کے درمیان لکیری تعلق کی نمائندگی کرتا ہے۔",
        equation: "y = mx + c",
        properties: {
            domain: "All real numbers",
            range: "All real numbers",
            shape: "Straight line",
            shapeUr: "سیدھی لکیر",
        },
        example: "y = 2x + 3",
        visualParams: {
            color: "stroke-blue-500",
            svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100" x2="200" y2="100" stroke="#e2e8f0" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="200" stroke="#e2e8f0" stroke-width="1"/><line x1="20" y1="140" x2="180" y2="60" stroke="#3b82f6" stroke-width="3" fill="none"/></svg>`,
        },
    },
    {
        id: "quadratic",
        name: "Quadratic Graph",
        nameUr: "مربعی گراف",
        type: "Polynomial",
        typeUr: "کثیر الحدود",
        description: "A parabola-shaped graph representing a quadratic relationship.",
        descriptionUr: "ایک سہ موی شکل کا گراف جو مربعی تعلق کی نمائندگی کرتا ہے۔",
        equation: "y = ax² + bx + c",
        properties: {
            domain: "All real numbers",
            range: "y ≥ k or y ≤ k (depending on a)",
            shape: "Parabola",
            shapeUr: "سہ موی",
        },
        example: "y = x² - 4x + 3",
        visualParams: {
            color: "stroke-green-500",
            svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100" x2="200" y2="100" stroke="#e2e8f0" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="200" stroke="#e2e8f0" stroke-width="1"/><path d="M 20 180 Q 100 20 180 180" stroke="#22c55e" stroke-width="3" fill="none"/></svg>`,
        },
    },
    {
        id: "cubic",
        name: "Cubic Graph",
        nameUr: "مکعبی گراف",
        type: "Polynomial",
        typeUr: "کثیر الحدود",
        description: "An S-shaped curve representing a cubic relationship.",
        descriptionUr: "ایک S شکل کا منحنی جو مکعبی تعلق کی نمائندگی کرتا ہے۔",
        equation: "y = ax³ + bx² + cx + d",
        properties: {
            domain: "All real numbers",
            range: "All real numbers",
            shape: "S-curve",
            shapeUr: "S منحنی",
        },
        example: "y = x³ - 3x² + 2",
        visualParams: {
            color: "stroke-purple-500",
            svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100" x2="200" y2="100" stroke="#e2e8f0" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="200" stroke="#e2e8f0" stroke-width="1"/><path d="M 20 120 C 60 150, 80 80, 100 100 C 120 120, 140 50, 180 80" stroke="#a855f7" stroke-width="3" fill="none"/></svg>`,
        },
    },
    {
        id: "hyperbolic",
        name: "Hyperbolic Graph",
        nameUr: "زائد القطعی گراف",
        type: "Rational",
        typeUr: "کسری",
        description: "A graph with two separate curves, representing inverse relationships.",
        descriptionUr: "دو الگ منحنی خطوط والا گراف، جو معکوس تعلقات کی نمائندگی کرتا ہے۔",
        equation: "y = k/x",
        properties: {
            domain: "x ≠ 0",
            range: "y ≠ 0",
            shape: "Two hyperbolas",
            shapeUr: "دو زائد القطع",
        },
        example: "y = 1/x",
        visualParams: {
            color: "stroke-orange-500",
            svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100" x2="200" y2="100" stroke="#e2e8f0" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="200" stroke="#e2e8f0" stroke-width="1"/><path d="M 20 20 Q 80 50 95 95" stroke="#f97316" stroke-width="3" fill="none"/><path d="M 105 105 Q 120 150 180 180" stroke="#f97316" stroke-width="3" fill="none"/></svg>`,
        },
    },
    {
        id: "exponential",
        name: "Exponential Graph",
        nameUr: "تاثیری گراف",
        type: "Exponential",
        typeUr: "تاثیری",
        description: "A rapidly increasing or decreasing curve representing exponential growth or decay.",
        descriptionUr: "تیزی سے بڑھتا یا گھٹتا ہوا منحنی جو تاثیری نمو یا زوال کی نمائندگی کرتا ہے۔",
        equation: "y = aᵇˣ",
        properties: {
            domain: "All real numbers",
            range: "y > 0 (for a > 0)",
            shape: "Exponential curve",
            shapeUr: "تاثیری منحنی",
        },
        example: "y = 2ˣ",
        visualParams: {
            color: "stroke-red-500",
            svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100" x2="200" y2="100" stroke="#e2e8f0" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="200" stroke="#e2e8f0" stroke-width="1"/><path d="M 20 180 Q 80 120, 120 60 T 180 20" stroke="#ef4444" stroke-width="3" fill="none"/></svg>`,
        },
    },
    {
        id: "logarithmic",
        name: "Logarithmic Graph",
        nameUr: "لوگارتھمی گراف",
        type: "Logarithmic",
        typeUr: "لوگارتھمی",
        description: "A slowly increasing curve representing logarithmic relationships.",
        descriptionUr: "آہستہ آہستہ بڑھتا ہوا منحنی جو لوگارتھمی تعلقات کی نمائندگی کرتا ہے۔",
        equation: "y = log(x)",
        properties: {
            domain: "x > 0",
            range: "All real numbers",
            shape: "Logarithmic curve",
            shapeUr: "لوگارتھمی منحنی",
        },
        example: "y = log₁₀(x)",
        visualParams: {
            color: "stroke-teal-500",
            svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100" x2="200" y2="100" stroke="#e2e8f0" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="200" stroke="#e2e8f0" stroke-width="1"/><path d="M 105 180 Q 120 80, 180 60" stroke="#14b8a6" stroke-width="3" fill="none"/></svg>`,
        },
    },
    {
        id: "sine",
        name: "Sine Graph",
        nameUr: "سائن گراف",
        type: "Trigonometric",
        typeUr: "مثلثاتی",
        description: "A wave-like graph representing periodic oscillations.",
        descriptionUr: "لہر کی طرح کا گراف جو دوری تذبذبات کی نمائندگی کرتا ہے۔",
        equation: "y = sin(x)",
        properties: {
            domain: "All real numbers",
            range: "-1 ≤ y ≤ 1",
            shape: "Sine wave",
            shapeUr: "سائن لہر",
        },
        example: "y = sin(x)",
        visualParams: {
            color: "stroke-pink-500",
            svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100" x2="200" y2="100" stroke="#e2e8f0" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="200" stroke="#e2e8f0" stroke-width="1"/><path d="M 0 100 Q 25 60, 50 100 T 100 100 T 150 100 T 200 100" stroke="#ec4899" stroke-width="3" fill="none"/></svg>`,
        },
    },
    {
        id: "cosine",
        name: "Cosine Graph",
        nameUr: "کوسائن گراف",
        type: "Trigonometric",
        typeUr: "مثلثاتی",
        description: "Similar to sine but shifted, representing periodic oscillations.",
        descriptionUr: "سائن کی طرح لیکن منتقل شدہ، دوری تذبذبات کی نمائندگی کرتا ہے۔",
        equation: "y = cos(x)",
        properties: {
            domain: "All real numbers",
            range: "-1 ≤ y ≤ 1",
            shape: "Cosine wave",
            shapeUr: "کوسائن لہر",
        },
        example: "y = cos(x)",
        visualParams: {
            color: "stroke-indigo-500",
            svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100" x2="200" y2="100" stroke="#e2e8f0" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="200" stroke="#e2e8f0" stroke-width="1"/><path d="M 0 60 Q 25 100, 50 140 T 100 60 T 150 140 T 200 60" stroke="#6366f1" stroke-width="3" fill="none"/></svg>`,
        },
    },
    {
        id: "tangent",
        name: "Tangent Graph",
        nameUr: "ٹینجنٹ گراف",
        type: "Trigonometric",
        typeUr: "مثلثاتی",
        description: "A graph with vertical asymptotes representing the tangent function.",
        descriptionUr: "عمودی مقاربات والا گراف جو ٹینجنٹ فنکشن کی نمائندگی کرتا ہے۔",
        equation: "y = tan(x)",
        properties: {
            domain: "x ≠ π/2 + nπ",
            range: "All real numbers",
            shape: "Periodic with asymptotes",
            shapeUr: "مقاربات کے ساتھ دوری",
        },
        example: "y = tan(x)",
        visualParams: {
            color: "stroke-amber-500",
            svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100" x2="200" y2="100" stroke="#e2e8f0" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="200" stroke="#e2e8f0" stroke-width="1"/><path d="M 20 130 L 45 90" stroke="#f59e0b" stroke-width="3" fill="none"/><path d="M 55 110 L 80 20" stroke="#f59e0b" stroke-width="3" fill="none"/><path d="M 120 180 L 145 140" stroke="#f59e0b" stroke-width="3" fill="none"/><path d="M 155 120 L 180 30" stroke="#f59e0b" stroke-width="3" fill="none"/></svg>`,
        },
    },
];
