import * as React from "react";
// We ONLY import the pure component. No Framer dependencies here.
import { InteractiveTiltCard } from "@/components/ui/tilt-card"; 

// This is our Demo Container. It's like a Storybook story.
// Its job is to create a fake environment to display the component.
export default function TiltCardDemo() {
    return (
        // 1. A container to center the card and provide a background
        <div
            style={{
                display: "grid",
                placeItems: "center",
                width: "100vw",
                height: "100vh",
                background: "linear-gradient(to bottom right, #2d3748, #1a202c)",
            }}
        >
            {/* 2. A sized box to constrain our component */}
            <div style={{ width: "300px", height: "400px" }}>
                {/* 3. The Pure UI component with hardcoded props for the demo */}
                <InteractiveTiltCard
                    image={{
                        src: "https://framerusercontent.com/images/n1lJP1YnTFEm9jTtkCsCLmxdmw.jpg",
                        alt: "Blue flower in a vase",
                    }}
                    tiltFactor={20}
                    hoverScale={1.07}
                    shadowIntensity={0.6}
                    glareEffect={true}
                    glareIntensity={0.4}
                />
            </div>
        </div>
    );
}
