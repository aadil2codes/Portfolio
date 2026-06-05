"use client";

import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1472214222541-d510753a4707?auto=format&fit=crop&q=80&w=600"
];

const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);

  const getImageWidth = (index: number) =>
    index === expandedImage ? "24rem" : "5rem";

  return (
    <div className="w-full h-full bg-transparent">
      <div className="relative flex items-center justify-center p-2 transition-all duration-300 ease-in-out w-full">
        <div className="w-full h-full overflow-hidden rounded-3xl">
          <div className="flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
            <div className="relative w-full max-w-6xl">
              <div className="flex w-full items-center justify-center gap-1.5">
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out shadow-lg"
                    style={{
                      width: getImageWidth(idx + 1),
                      height: "20rem",
                    }}
                    onMouseEnter={() => setExpandedImage(idx + 1)}
                  >
                    <img
                      className="w-full h-full object-cover select-none pointer-events-none"
                      src={src}
                      alt={`Image ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;
