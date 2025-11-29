"use client";

import { useState } from "react";
import { shapes, Shape } from "@/data/shapes";
import { ShapeCard } from "@/components/ShapeCard";
import { ShapeModal } from "@/components/ShapeModal";
import { FontSizeToggle } from "@/components/FontSizeToggle";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

export default function Shapes2D() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const { language, isUrdu, fontScale, setFontScale } = useApp();

  const handleIncreaseFont = () => setFontScale(prev => Math.min(prev + 0.1, 1.5));
  const handleDecreaseFont = () => setFontScale(prev => Math.max(prev - 0.1, 0.75));
  const handleResetFont = () => setFontScale(1);

  const filteredShapes = shapes.filter((shape) => {
    const name = isUrdu ? shape.nameUr : shape.name;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Search Bar */}
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
              {isUrdu ? "2D ہندسی اشکال" : "2D Geometric Shapes"}
            </h2>
            <p className={cn("text-slate-500 dark:text-slate-400 max-w-2xl", isUrdu ? "ml-auto font-serif" : "")}>
              {isUrdu
                ? "جیومیٹری کی دنیا کو دریافت کریں۔ کسی بھی شکل پر کلک کریں تاکہ اس کی خصوصیات، رقبہ اور احاطہ کے فارمولے، اور مزید تفصیلات جان سکیں۔"
                : "Explore the world of 2D geometry. Click on any shape to reveal its properties, formulas for area and perimeter, and more."
              }
            </p>
          </div>
        </div>

        {filteredShapes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" dir={isUrdu ? "rtl" : "ltr"}>
            {filteredShapes.map((shape) => (
              <ShapeCard
                key={shape.id}
                shape={shape}
                language={language}
                onClick={setSelectedShape}
              />
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
                ? `ہمیں "${searchTerm}" سے مطابقت رکھنے والی کوئی شکل نہیں ملی۔ کوئی اور اصطلاح تلاش کرنے کی کوشش کریں۔`
                : `We couldn't find any shapes matching "${searchTerm}". Try a different search term.`
              }
            </p >
          </div >
        )}
      </div >

      {/* Footer */}
      < footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 mt-auto" >
        <div className="container mx-auto px-4 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Mathify. All rights reserved.</p>
        </div>
      </footer >

      {/* Modal */}
      < ShapeModal
        shape={selectedShape}
        isOpen={!!selectedShape}
        onClose={() => setSelectedShape(null)}
        language={language}
      />

      {/* Font Size Toggle */}
      < FontSizeToggle
        onIncrease={handleIncreaseFont}
        onDecrease={handleDecreaseFont}
        onReset={handleResetFont}
        scale={fontScale}
      />
    </>
  );
}

