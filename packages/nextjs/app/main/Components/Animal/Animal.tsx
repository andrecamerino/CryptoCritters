"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./Animal.css"; // Assuming styles are defined here
import animalsData from "../../../data/animals.json"; // Adjust path if needed

const Animal = () => {
  const [animals, setAnimals] = useState<any[]>([]);

  // Define movement boundaries for the animals
  const boundary = {
    topMin: 30, // minimum vertical position (20% of viewport height)
    topMax: 60, // maximum vertical position (60% of viewport height)
    leftMin: 30, // minimum horizontal position (5% of viewport width)
    leftMax: 60, // maximum horizontal position (45% of viewport width)
  };

  useEffect(() => {
    // Load animals data from JSON
    setAnimals(animalsData);
  }, []);

  const handleMouseEnter = (name: string) => {
    // Pause the movement of the animal when hovered
    const element = document.getElementById(name);
    if (element) {
      element.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = (name: string) => {
    // Resume the movement of the animal after hover
    const element = document.getElementById(name);
    if (element) {
      element.style.animationPlayState = "running";
    }
  };

  // Function to generate random values for animation
  const getRandomAnimation = () => {
    const randomDuration = Math.random() * 100 + 100; // Slower movement (100s to 200s)
    const randomDirection = Math.random() < 0.5 ? "normal" : "reverse"; // Random direction
    const randomX = Math.random() * 4 - 2; // Smaller random X direction (-2vw to 2vw)
    const randomY = Math.random() * 4 - 2; // Smaller random Y direction (-2vh to 2vh)

    return {
      animation: `moveAnimal ${randomDuration}s linear infinite ${randomDirection}`,
      transform: `translate(${randomX}vw, ${randomY}vh)`, // Slight random translations within a smaller range
    };
  };

  const calculateZIndex = (top: number) => {
    // Calculate z-index based on top position, small increments
    return Math.floor((top - boundary.topMin) * 10);
  };

  return (
    <div className="animal-container">
      {animals.map((animal) => {
        const randomTop = Math.random() * (boundary.topMax - boundary.topMin) + boundary.topMin; // Random vertical position
        const randomLeft = Math.random() * (boundary.leftMax - boundary.leftMin) + boundary.leftMin; // Random horizontal position

        return (
          <div
            className="animal"
            key={animal.name}
            id={animal.name}
            onMouseEnter={() => handleMouseEnter(animal.name)}
            onMouseLeave={() => handleMouseLeave(animal.name)}
            style={{
              position: "absolute",
              top: `${randomTop}vh`, // Random vertical movement within the defined bounds
              left: `${randomLeft}vw`, // Random horizontal movement within the defined bounds
              zIndex: calculateZIndex(randomTop), // Dynamically calculated zIndex based on vertical position
              transition: "top 1s, left 1s", // Smooth transition for initial position
              ...getRandomAnimation(), // Apply random animation speed, direction, and translation
            }}
          >
            <Image
              src={animal.imageSource}
              alt={animal.animalType}
              width={150}
              height={150}
            />
            <div className="animal-info">
              <h3>{animal.name}</h3>
              <p>Type: {animal.animalType}</p>
              <p>Endangerment: {animal.endangerment}</p>
              <p>Group Size: {animal.groupSize}</p>
              <p>Habitat: {animal.habitat}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Animal;