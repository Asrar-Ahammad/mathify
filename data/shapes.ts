
export interface Shape {
  id: string;
  name: string;
  nameUr: string;
  type: string;
  typeUr: string;
  description: string;
  descriptionUr: string;
  formulas: {
    area: string;
    perimeter: string;
    [key: string]: string;
  };
  properties: {
    sides: number;
    angles: string;
    anglesUr: string;
    [key: string]: any;
  };
  visualParams: {
    color: string;
    path?: string;
    cssClass?: string;
    viewBox?: string;
  };
}

export const shapes: Shape[] = [
  {
    id: "square",
    name: "Square",
    nameUr: "مربع",
    type: "Quadrilateral",
    typeUr: "چوگوشہ",
    description: "A regular quadrilateral, which means that it has four equal sides and four equal angles (90-degree angles).",
    descriptionUr: "ایک باقاعدہ چوگوشہ، جس کا مطلب ہے کہ اس کے چاروں اطراف برابر ہیں اور چاروں زاویے برابر (90 ڈگری) ہیں۔",
    formulas: {
      area: "s²",
      perimeter: "4s",
    },
    properties: {
      sides: 4,
      angles: "All angles are 90°",
      anglesUr: "تمام زاویے 90 ڈگری ہیں",
    },
    visualParams: {
      color: "bg-blue-500",
      cssClass: "w-32 h-32",
    },
  },
  {
    id: "rectangle",
    name: "Rectangle",
    nameUr: "مستطیل",
    type: "Quadrilateral",
    typeUr: "چوگوشہ",
    description: "A quadrilateral with four right angles. It can also be defined as an equiangular quadrilateral, since equiangular means that all of its angles are equal.",
    descriptionUr: "ایک چوگوشہ جس کے چاروں زاویے قائمہ ہیں۔ اسے مساوی الزاویہ چوگوشہ بھی کہا جا سکتا ہے کیونکہ اس کے تمام زاویے برابر ہیں۔",
    formulas: {
      area: "l × w",
      perimeter: "2(l + w)",
    },
    properties: {
      sides: 4,
      angles: "All angles are 90°",
      anglesUr: "تمام زاویے 90 ڈگری ہیں",
    },
    visualParams: {
      color: "bg-green-500",
      cssClass: "w-40 h-24",
    },
  },
  {
    id: "parallelogram",
    name: "Parallelogram",
    nameUr: "متوازی الاضلاع",
    type: "Quadrilateral",
    typeUr: "چوگوشہ",
    description: "A simple (non-self-intersecting) quadrilateral with two pairs of parallel sides.",
    descriptionUr: "ایک سادہ (غیر خود کو کاٹنے والا) چوگوشہ جس کے متوازی اطراف کے دو جوڑے ہوں۔",
    formulas: {
      area: "b × h",
      perimeter: "2(a + b)",
    },
    properties: {
      sides: 4,
      angles: "Opposite angles are equal",
      anglesUr: "مخالف زاویے برابر ہیں",
    },
    visualParams: {
      color: "bg-purple-500",
      cssClass: "w-40 h-24 -skew-x-12",
    },
  },
  {
    id: "triangle",
    name: "Triangle",
    nameUr: "مثلث",
    type: "Triangle",
    typeUr: "تکون",
    description: "A polygon with three edges and three vertices. It is one of the basic shapes in geometry.",
    descriptionUr: "تین کناروں اور تین کونوں والا کثیر الاضلاع۔ یہ جیومیٹری کی بنیادی اشکال میں سے ایک ہے۔",
    formulas: {
      area: "½ × b × h",
      perimeter: "a + b + c",
    },
    properties: {
      sides: 3,
      angles: "Sum of angles is 180°",
      anglesUr: "زاویوں کا مجموعہ 180 ڈگری ہے",
    },
    visualParams: {
      color: "border-b-orange-500",
      cssClass: "w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px]",
    },
  },
  {
    id: "circle",
    name: "Circle",
    nameUr: "دائرہ",
    type: "Curved",
    typeUr: "گول",
    description: "A shape consisting of all points in a plane that are at a given distance from a given point, the centre.",
    descriptionUr: "ایک شکل جو ہوائی جہاز کے تمام پوائنٹس پر مشتمل ہوتی ہے جو ایک دیئے گئے نقطہ، مرکز سے ایک مقررہ فاصلے پر ہوتے ہیں۔",
    formulas: {
      area: "πr²",
      perimeter: "2πr (Circumference)",
    },
    properties: {
      sides: 0,
      angles: "360°",
      anglesUr: "360 ڈگری",
    },
    visualParams: {
      color: "bg-red-500",
      cssClass: "w-32 h-32 rounded-full",
    },
  },
  {
    id: "trapezoid",
    name: "Trapezoid",
    nameUr: "منحرف",
    type: "Quadrilateral",
    typeUr: "چوگوشہ",
    description: "A quadrilateral with at least one pair of parallel sides.",
    descriptionUr: "ایک چوگوشہ جس میں متوازی اطراف کا کم از کم ایک جوڑا ہو۔",
    formulas: {
      area: "½(a + b)h",
      perimeter: "a + b + c + d",
    },
    properties: {
      sides: 4,
      angles: "Sum of interior angles is 360°",
      anglesUr: "اندرونی زاویوں کا مجموعہ 360 ڈگری ہے",
    },
    visualParams: {
      color: "border-b-teal-500",
      cssClass: "w-[100px] h-[100px] border-b-[100px] border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent",
    },
  },
  {
    id: "rhombus",
    name: "Rhombus",
    nameUr: "معین",
    type: "Quadrilateral",
    typeUr: "چوگوشہ",
    description: "A quadrilateral whose four sides all have the same length.",
    descriptionUr: "ایک چوگوشہ جس کے چاروں اطراف کی لمبائی ایک جیسی ہو۔",
    formulas: {
      area: "½ × d₁ × d₂",
      perimeter: "4s",
    },
    properties: {
      sides: 4,
      angles: "Opposite angles are equal",
      anglesUr: "مخالف زاویے برابر ہیں",
    },
    visualParams: {
      color: "bg-pink-500",
      cssClass: "w-24 h-24 rotate-45 skew-x-12",
    },
  },
  {
    id: "pentagon",
    name: "Pentagon",
    nameUr: "مُخَمَّس",
    type: "Polygon",
    typeUr: "کثیر الاضلاع",
    description: "A geometrical shape with 5 sides and 5 angles.",
    descriptionUr: "5 اطراف اور 5 زاویوں والی ہندسی شکل۔",
    formulas: {
      area: "¼ × √(5(5+2√5)) × s²",
      perimeter: "5s",
    },
    properties: {
      sides: 5,
      angles: "Interior angle 108°",
      anglesUr: "اندرونی زاویہ 108 ڈگری",
    },
    visualParams: {
      color: "fill-yellow-500",
      path: "M50 0 L97.55 34.55 L79.39 90.45 L20.61 90.45 L2.45 34.55 Z",
      viewBox: "0 0 100 100",
    },
  },
  {
    id: "hexagon",
    name: "Hexagon",
    nameUr: "مسدس",
    type: "Polygon",
    typeUr: "کثیر الاضلاع",
    description: "A geometrical shape with 6 sides and 6 angles.",
    descriptionUr: "6 اطراف اور 6 زاویوں والی ہندسی شکل۔",
    formulas: {
      area: "3√3/2 × s²",
      perimeter: "6s",
    },
    properties: {
      sides: 6,
      angles: "Interior angle 120°",
      anglesUr: "اندرونی زاویہ 120 ڈگری",
    },
    visualParams: {
      color: "fill-indigo-500",
      path: "M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z",
      viewBox: "0 0 100 100",
    },
  },
  {
    id: "kite",
    name: "Kite",
    nameUr: "پتنگ",
    type: "Quadrilateral",
    typeUr: "چوگوشہ",
    description: "A quadrilateral with two pairs of equal-length sides that are adjacent to each other.",
    descriptionUr: "ایک چوگوشہ جس کے برابر لمبائی والے اطراف کے دو جوڑے ایک دوسرے سے متصل ہوں۔",
    formulas: {
      area: "½ × d₁ × d₂",
      perimeter: "2(a + b)",
    },
    properties: {
      sides: 4,
      angles: "One pair of opposite angles is equal",
      anglesUr: "مخالف زاویوں کا ایک جوڑا برابر ہے",
    },
    visualParams: {
      color: "fill-cyan-500",
      path: "M50 0 L90 40 L50 100 L10 40 Z",
      viewBox: "0 0 100 100",
    },
  },
];
