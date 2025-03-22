import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./EggStore.css";
import ExitButton from "~~/Components/ExitButton/ExitButton";

type Animal = {
  name: string;
  animalType: string;
  endangerment: string;
  groupSize: number;
  imageSource: string;
  habitat: string;
  facts: string[];  // Added facts array
};

type EggRarity = {
  type: string;
  animals: Animal[];
};

const eggRarities: EggRarity[] = [
  // (same as your existing eggRarities array)
];

const EggStore: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [displayedAnimal, setDisplayedAnimal] = useState<Animal | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [randomFact, setRandomFact] = useState<string | null>(null); // State to store random fact
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference for the audio element

  // Play music automatically when the component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []); // Empty dependency array to run only once on mount

  const handleEggClick = (type: string) => {
    const animalsForRarity = eggRarities.find(rarity => rarity.type === type)?.animals ?? [];
    const finalAnimal = animalsForRarity[Math.floor(Math.random() * animalsForRarity.length)];

    // Get a random fact from the selected animal
    const fact = finalAnimal.facts[Math.floor(Math.random() * finalAnimal.facts.length)];
    setRandomFact(fact);

    setIsRolling(true);
    setSelectedAnimal(null); // Hide previous selection

    let counter = 0;
    const rollDuration = 2000; // 2 seconds
    const interval = setInterval(() => {
      const randomAnimal = animalsForRarity[Math.floor(Math.random() * animalsForRarity.length)];
      setDisplayedAnimal(randomAnimal);
      counter += 100;
      if (counter >= rollDuration) {
        clearInterval(interval);
        setDisplayedAnimal(finalAnimal);
        setSelectedAnimal(finalAnimal);
        setIsRolling(false);
      }
    }, 100);
  };

  const getEndangermentClass = (endangerment: string) => {
    if (endangerment === "Least Concern") {
      return "green"; // For Least Concern
    } else if (endangerment === "Vulnerable") {
      return "yellow"; // For Vulnerable
    } else if (endangerment === "Endangered") {
      return "red"; // For Endangered
    }
    return ""; // Default if needed
  };

  return (
    <div className="egg-store">
      <div className="header">
        <ExitButton label="Exit" href="/" />
      </div>

      <div className="eggs">
        <div className="egg-container">
          <p className="egg-rarity">Common</p>
          <div className="egg" onClick={() => handleEggClick("Common")}>
            <Image src="/egg_images/common_egg.png" alt="Common egg" width={200} height={200} />
          </div>
          <p className="egg-price">Price: 10 NZDD</p>
        </div>

        <div className="egg-container">
          <p className="egg-rarity">Rare</p>
          <div className="egg" onClick={() => handleEggClick("Rare")}>
            <Image src="/egg_images/uncommon_egg.png" alt="Rare egg" width={200} height={200} />
          </div>
          <p className="egg-price">Price: 50 NZDD</p>
        </div>

        <div className="egg-container">
          <p className="egg-rarity">Legendary</p>
          <div className="egg" onClick={() => handleEggClick("Legendary")}>
            <Image src="/egg_images/rare_egg.png" alt="Legendary egg" width={200} height={200} />
          </div>
          <p className="egg-price">Price: 200 NZDD</p>
        </div>
      </div>

      {displayedAnimal && (
        <div className="selected-animal">
          <Image
            src={displayedAnimal.imageSource}
            alt={displayedAnimal.name}
            width={400}
            height={400}
            className={isRolling ? "blackout" : "reveal"}
            style={{ textAlign: "center" }}
          />
          <h3 style={{ textAlign: "center" }}>{isRolling ? "Rolling..." : `${displayedAnimal.name} was born!`}</h3>
          {!isRolling && (
            <>
              <p>Species: {displayedAnimal.animalType}</p>
              <p >
                Endangerment: <span className={`endangerment ${getEndangermentClass(displayedAnimal.endangerment)}`}>{displayedAnimal.endangerment}</span>
              </p>
              <p>Fact: {randomFact}</p> {/* Display random fact */}
              <button className="close-button" onClick={() => setDisplayedAnimal(null)}>
                Close
              </button>
            </>
          )}
        </div>
      )}

      <div className="egg-table">
        <Image src="/egg_table.png" alt="Egg table" width={2800} height={2800} />
      </div>

      {/* Audio for the background music */}
      <audio ref={audioRef} loop>
        <source src="/egg.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default EggStore;
