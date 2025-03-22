import React, { useState } from "react";
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
  {
    type: "Common",
    animals: [
      {
        name: "Stick",
        animalType: "stick_insect",
        endangerment: "Least Concern",
        groupSize: 20,
        imageSource: "/animal_images/stick_insect.png",
        habitat: "land",
        facts: [
          "Stick insects are masters of camouflage, blending in perfectly with their surroundings.",
          "They feed primarily on leaves, using their long bodies to navigate through plants.",
          "Stick insects can regenerate lost legs as part of their defense mechanism."
        ]
      },
      {
        name: "Splash",
        animalType: "seal",
        endangerment: "Least Concern",
        groupSize: 15,
        imageSource: "/animal_images/seal1.png",
        habitat: "sea",
        facts: [
          "Seals have a thick layer of blubber to protect them from cold water.",
          "They are highly agile swimmers, capable of reaching speeds of up to 40 km/h.",
          "Seals communicate through a combination of vocalizations, body language, and scent."
        ]
      },
      {
        name: "Pebbles",
        animalType: "seal2",
        endangerment: "Least Concern",
        groupSize: 12,
        imageSource: "/animal_images/seal2.png",
        habitat: "sea",
        facts: [
          "Seals use their whiskers to detect prey in dark or murky waters.",
          "They can hold their breath for several minutes while diving.",
          "Seals are known for their playful behavior, especially in their interactions with humans."
        ]
      },
    ],
  },
  {
    type: "Rare",
    animals: [
      {
        name: "Fluffy",
        animalType: "penguin",
        endangerment: "Vulnerable",
        groupSize: 10,
        imageSource: "/animal_images/penguin1.png",
        habitat: "sea",
        facts: [
          "Penguins are excellent swimmers but cannot fly.",
          "They have a layer of blubber beneath their skin to keep warm in cold waters.",
          "Penguins communicate with a wide range of vocalizations and body movements."
        ]
      },
      {
        name: "Iceberg",
        animalType: "penguin2",
        endangerment: "Vulnerable",
        groupSize: 8,
        imageSource: "/animal_images/penguin2.png",
        habitat: "sea",
        facts: [
          "Some penguins, like the Emperor Penguin, can dive to depths of over 500 meters.",
          "Penguins typically live in the Southern Hemisphere, especially Antarctica.",
          "Penguins often huddle together to stay warm in freezing temperatures."
        ]
      },
    ],
  },
  {
    type: "Legendary",
    animals: [
      {
        name: "Penny",
        animalType: "kiwi",
        endangerment: "Endangered",
        groupSize: 5,
        imageSource: "/animal_images/kiwi.png",
        habitat: "land",
        facts: [
          "Kiwi birds are nocturnal and prefer to forage for food at night.",
          "They are flightless, with small wings and large, powerful legs.",
          "The kiwi is the national symbol of New Zealand."
        ]
      },
    ],
  },
];


const EggStore: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [displayedAnimal, setDisplayedAnimal] = useState<Animal | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [randomFact, setRandomFact] = useState<string | null>(null); // State to store random fact


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
    </div>
  );
};


export default EggStore;

