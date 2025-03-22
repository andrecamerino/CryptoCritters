"use client";

import Image from "next/image";
import "./Cloud.css";

type CloudProps = {
  height: string;  // Height to set the cloud's vertical position
  speed: string;   // Speed for the animation (in seconds)
  direction: string; // Direction for animation: "normal" or "reverse"
  size: number;     // Size of the cloud (width and height)
};

const Cloud = ({ height, speed, direction, size }: CloudProps) => {
  return (
    <div className="cloud-container">
      <div
        className="cloud"
        style={{
          top: height,   // Dynamically set the vertical position
          animationDuration: speed,  // Dynamically set the animation speed
          animationDirection: direction === "reverse" ? "reverse" : "normal", // Handle reverse direction
          width: size,   // Dynamically set the width of the cloud
          height: size,  // Dynamically set the height of the cloud
        }}
      >
        <Image
          src="/cloud.png"
          alt="Moving Cloud"
          width={size}
          height={size}
        />
      </div>
    </div>
  );
};

export default Cloud;