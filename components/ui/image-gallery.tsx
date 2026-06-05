import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
}

interface ImageAccordionGalleryProps {
  items?: GalleryItem[];
  className?: string;
}

const defaultItems: GalleryItem[] = [
  {
    id: "ece",
    title: "B.Tech ECE",
    subtitle: "Hardware Architectures & Signals",
    imageSrc: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=800",
  },
  {
    id: "jee",
    title: "JEE Preparation",
    subtitle: "Physics, Chemistry & Mathematics",
    imageSrc: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800",
  },
  {
    id: "programming",
    title: "Python & Development",
    subtitle: "Logic Synthesis & Scripting",
    imageSrc: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800",
  },
  {
    id: "data-science",
    title: "Data Science & AI",
    subtitle: "Analytics, NumPy & ML Models",
    imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=800",
  },
];

export function ImageAccordionGallery({ items = defaultItems, className }: ImageAccordionGalleryProps) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  return (
    <div className={cn("flex w-full h-full gap-3 overflow-hidden rounded-2xl", className)}>
      {items.map((item) => {
        const isHovered = hoveredId === item.id;
        const isAnyHovered = hoveredId !== null;
        
        return (
          <motion.div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              "relative h-full cursor-pointer overflow-hidden rounded-xl border border-zinc-800 transition-all duration-300",
              isHovered ? "flex-[3.5]" : isAnyHovered ? "flex-[0.8]" : "flex-[1]"
            )}
            layout
          >
            {/* Background Image */}
            <img
              src={item.imageSrc}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover filter grayscale contrast-125 transition-transform duration-500 hover:scale-105"
            />
            {/* Dark Matte Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10" />

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col justify-end h-full">
              <motion.div
                initial={false}
                animate={{
                  y: isHovered ? 0 : 4,
                  opacity: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <span className="font-mono text-[9px] text-[#FF7A00] tracking-wider uppercase mb-1">
                  {item.id.replace("-", " ")}
                </span>
                <h4 className="text-white font-semibold text-sm tracking-tight truncate">
                  {item.title}
                </h4>
                
                {isHovered && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-zinc-400 mt-1 leading-snug line-clamp-2"
                  >
                    {item.subtitle}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
