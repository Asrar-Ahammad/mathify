
export interface Shape3D {
    id: string;
    name: string;
    nameUr: string;
    type: string;
    typeUr: string;
    description: string;
    descriptionUr: string;
    formulas: {
        volume: string;
        curvedSurfaceArea?: string;
        totalSurfaceArea: string;
        [key: string]: string | undefined;
    };
    properties: {
        faces: number;
        edges: number;
        vertices: number;
        details: string;
        detailsUr: string;
    };
    visualParams: {
        color: string;
        svg: string; // SVG representation
    };
}

export const shapes3D: Shape3D[] = [
    {
        id: "cube",
        name: "Cube",
        nameUr: "مکعب",
        type: "Polyhedron",
        typeUr: "کثیر السطوح",
        description: "A three-dimensional solid object bounded by six square faces.",
        descriptionUr: "ایک سہ جہتی ٹھوس چیز جس کی چھ مربع سطحیں ہوں۔",
        formulas: {
            volume: "a³",
            totalSurfaceArea: "6a²",
        },
        properties: {
            faces: 6,
            edges: 12,
            vertices: 8,
            details: "All faces are squares",
            detailsUr: "تمام سطحیں مربع ہیں",
        },
        visualParams: {
            color: "fill-blue-500",
            svg: `<svg viewBox="0 0 100 100"><path d="M30,40 L70,40 L70,80 L30,80 Z M30,40 L50,20 L90,20 L70,40 M70,40 L90,20 L90,60 L70,80" stroke="currentColor" stroke-width="2"/></svg>`,
        },
    },
    {
        id: "cuboid",
        name: "Cuboid", nameUr: "مکعب مستطیل",
        type: "Polyhedron",
        typeUr: "کثیر السطوح",
        description: "A three-dimensional figure with six rectangular faces.",
        descriptionUr: "چھ مستطیل سطحوں والی ایک سہ جہتی شکل۔",
        formulas: {
            volume: "l × w × h",
            totalSurfaceArea: "2(lw + wh + hl)",
        },
        properties: {
            faces: 6,
            edges: 12,
            vertices: 8,
            details: "Opposite faces are equal rectangles",
            detailsUr: "مخالف سطحیں برابر مستطیل ہیں",
        },
        visualParams: {
            color: "fill-green-500",
            svg: `<svg viewBox="0 0 100 100"><path d="M25,45 L75,45 L75,85 L25,85 Z M25,45 L45,25 L95,25 L75,45 M75,45 L95,25 L95,65 L75,85" stroke="currentColor" stroke-width="2"/></svg>`,
        },
    },
    {
        id: "sphere",
        name: "Sphere",
        nameUr: "کرہ",
        type: "Curved Surface",
        typeUr: "گول سطح",
        description: "A perfectly round geometrical object in three-dimensional space.",
        descriptionUr: "سہ جہتی خلا میں ایک کامل گول ہندسی چیز۔",
        formulas: {
            volume: "⁴⁄₃πr³",
            curvedSurfaceArea: "4πr²",
            totalSurfaceArea: "4πr²",
        },
        properties: {
            faces: 1,
            edges: 0,
            vertices: 0,
            details: "All points equidistant from center",
            detailsUr: "تمام نقاط مرکز سے ہم فاصلہ ہیں",
        },
        visualParams: {
            color: "fill-red-500",
            svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" stroke="currentColor" stroke-width="2"/><ellipse cx="50" cy="50" rx="35" ry="10" stroke="currentColor" stroke-width="1" fill="none"/></svg>`,
        },
    },
    {
        id: "cylinder",
        name: "Cylinder",
        nameUr: "استوانہ",
        type: "Curved Surface",
        typeUr: "گول سطح",
        description: "A three-dimensional solid with two parallel circular bases.",
        descriptionUr: "دو متوازی دائروی بنیادوں والی سہ جہتی ٹھوس شکل۔",
        formulas: {
            volume: "πr²h",
            curvedSurfaceArea: "2πrh",
            totalSurfaceArea: "2πr(r + h)",
        },
        properties: {
            faces: 3,
            edges: 2,
            vertices: 0,
            details: "Two circular faces and one curved surface",
            detailsUr: "دو دائروی سطحیں اور ایک گول سطح",
        },
        visualParams: {
            color: "fill-purple-500",
            svg: `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="30" rx="25" ry="8" stroke="currentColor" stroke-width="2"/><path d="M25,30 L25,70 M75,30 L75,70" stroke="currentColor" stroke-width="2"/><ellipse cx="50" cy="70" rx="25" ry="8" stroke="currentColor" stroke-width="2"/></svg>`,
        },
    },
    {
        id: "cone",
        name: "Cone",
        nameUr: "مخروط",
        type: "Curved Surface",
        typeUr: "گول سطح",
        description: "A three-dimensional geometric shape that tapers smoothly from a flat base to a point.",
        descriptionUr: "ایک سہ جہتی ہندسی شکل جو ایک چپٹی بنیاد سے ایک نقطے تک آہستہ آہستہ تنگ ہوتی ہے۔",
        formulas: {
            volume: "⁄₃πr²h",
            curvedSurfaceArea: "πrl",
            totalSurfaceArea: "πr(r + l)",
        },
        properties: {
            faces: 2,
            edges: 1,
            vertices: 1,
            details: "One circular base and one vertex",
            detailsUr: "ایک دائروی بنیاد اور ایک رأس",
        },
        visualParams: {
            color: "fill-orange-500",
            svg: `<svg viewBox="0 0 100 100"><path d="M50,20 L25,70 L75,70 Z" stroke="currentColor" stroke-width="2"/><ellipse cx="50" cy="70" rx="25" ry="8" stroke="currentColor" stroke-width="2"/></svg>`,
        },
    },
    {
        id: "pyramid",
        name: "Pyramid",
        nameUr: "ہرم",
        type: "Polyhedron",
        typeUr: "کثیر السطوح",
        description: "A polyhedron formed by connecting a polygonal base and a point (apex).",
        descriptionUr: "ایک کثیر السطوح جو ایک کثیر الاضلاع بنیاد اور ایک نقطہ (چوٹی) کو جوڑ کر بنتا ہے۔",
        formulas: {
            volume: "⁄₃ × Base Area × h",
            totalSurfaceArea: "Base Area + ½ × Perimeter × Slant Height",
        },
        properties: {
            faces: 5,
            edges: 8,
            vertices: 5,
            details: "Square base with 4 triangular faces",
            detailsUr: "4 تکونی سطحوں کے ساتھ مربع بنیاد",
        },
        visualParams: {
            color: "fill-yellow-500",
            svg: `<svg viewBox="0 0 100 100"><path d="M50,20 L20,80 L80,80 Z M50,20 L80,80 M50,20 L50,80" stroke="currentColor" stroke-width="2"/><path d="M20,80 L80,80 L65,70 L35,70 Z" stroke="currentColor" stroke-width="1"/></svg>`,
        },
    },
];
