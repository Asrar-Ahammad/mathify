# Mathify 📐

A beautiful, modern educational web application for exploring geometric shapes and mathematical graphs. Built with Next.js, featuring bilingual support (English & Urdu) with full RTL layout compatibility.

![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🔷 2D Shapes
- **10 Geometric Shapes**: Circle, Square, Rectangle, Triangle, Rhombus, Parallelogram, Trapezoid, Pentagon, Hexagon, Kite
- **Comprehensive Information**: Area and perimeter formulas with detailed properties
- **Interactive Cards**: Click any shape to see detailed information in a modal
- **Search Functionality**: Quickly find shapes by name in English or Urdu

### 🎲 3D Shapes
- **6 Solid Shapes**: Cube, Cuboid, Sphere, Cylinder, Cone, Pyramid
- **Advanced Formulas**: 
  - Volume
  - Curved Surface Area (CSA)
  - Total Surface Area (TSA)
- **Visual Representations**: SVG-based 3D visualizations
- **Detailed Properties**: Faces, edges, vertices, and descriptive details

### 📊 Mathematical Graphs
- **9 Graph Types**:
  - Linear (`y = mx + c`)
  - Quadratic (`y = ax² + bx + c`)
  - Cubic (`y = ax³ + bx² + cx + d`)
  - Hyperbolic (`y = k/x`)
  - Exponential (`y = aᵇˣ`)
  - Logarithmic (`y = log(x)`)
  - Trigonometric: Sine, Cosine, Tangent
- **Visual Previews**: SVG graph representations in modal view
- **Educational Content**: Equations, examples, domain, range, and shape descriptions
- **Interactive Graph Plotter**: Plot any mathematical function in real-time using function-plot library

### 🌍 Bilingual Support
- **English & Urdu**: Complete translations for all content
- **RTL Layout**: Automatic right-to-left layout for Urdu
- **Seamless Toggle**: Switch languages instantly with persistent preference

### 🎨 Design & UX
- **Modern UI**: Built with Shadcn UI components and TailwindCSS
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Mobile-first design with hamburger navigation
- **Font Size Control**: Adjustable font scaling (75% - 150%)
- **Beautiful Animations**: Smooth transitions and hover effects
- **Premium Aesthetics**: Gradient backgrounds, glassmorphism effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Asrar-Ahammad/mathify.git
cd mathify
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Graphing**: [function-plot](https://mauriciopoppe.github.io/function-plot/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)

## 📁 Project Structure

```
mathify/
├── app/
│   ├── graphs/
│   │   ├── page.tsx          # Graph types library
│   │   └── plotter/
│   │       └── page.tsx      # Interactive graph plotter
│   ├── shapes/
│   │   ├── 2d/
│   │   │   └── page.tsx      # 2D shapes page
│   │   └── 3d/
│   │       └── page.tsx      # 3D shapes page
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                   # Shadcn UI components
│   ├── FontSizeToggle.tsx
│   ├── LanguageToggle.tsx
│   ├── Navbar.tsx
│   ├── ShapeCard.tsx
│   └── ShapeModal.tsx
├── context/
│   └── AppContext.tsx        # Global state management
├── data/
│   ├── shapes.ts             # 2D shapes data
│   ├── shapes3d.ts           # 3D shapes data
│   └── graphs.ts             # Graph types data
└── lib/
    └── utils.ts
```

## 🎯 Key Features Breakdown

### Global State Management
- Uses React Context API for managing language and font size preferences
- Automatic persistence across page navigation
- Side effects for RTL layout and font scaling

### Responsive Navigation
- Desktop: Horizontal menu with language toggle
- Mobile: Hamburger menu with slide-down navigation
- Auto-close on link click for better UX

### Interactive Elements
- **Search Bars**: Real-time filtering for shapes and graphs
- **Modal Views**: Detailed information displayed in elegant modals
- **Hover Effects**: Visual feedback on interactive elements
- **Font Size Controls**: Floating toggle with +/- and reset buttons

### Localization
- Complete Urdu translations for all UI elements
- Proper RTL alignment for Urdu content
- Consistent serif font for Urdu text
- Bidirectional support for formulas and properties

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page (redirects to `/shapes/2d`) |
| `/shapes/2d` | 2D geometric shapes library |
| `/shapes/3d` | 3D geometric shapes library |
| `/graphs` | Mathematical graph types |
| `/graphs/plotter` | Interactive function plotter |

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Asrar Ahammad**

- GitHub: [@Asrar-Ahammad](https://github.com/Asrar-Ahammad)

## 🙏 Acknowledgments

- Shadcn for the amazing UI component library
- Next.js team for the excellent framework
- Mauricio Poppe for function-plot library
- Lucide for beautiful icons

---

Made with ❤️ for mathematics education
