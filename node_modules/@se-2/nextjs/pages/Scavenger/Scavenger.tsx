import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./Scavenger.css";
import ExitButton from "~~/Components/ExitButton/ExitButton";
import Link from "next/link";

const GRID_SIZE = 9;

const Scavenger: React.FC = () => {
  const [bushes, setBushes] = useState<Array<"berry" | "wolf" | "">>(new Array(GRID_SIZE).fill(""));
  const [revealed, setRevealed] = useState<boolean[]>(new Array(GRID_SIZE).fill(false));
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    // Play background music
    const audio = new Audio("/scavenge.mp3"); // Update with the correct path
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch((error) => console.log("Autoplay failed:", error));

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const placeItems = (): Array<"berry" | "wolf" | ""> => {
    let items: Array<"berry" | "wolf" | ""> = new Array(GRID_SIZE).fill("");
    let berries = 0;
    let wolves = 0;

    while (berries < 3) {
      let index = Math.floor(Math.random() * GRID_SIZE);
      if (items[index] === "") {
        items[index] = "berry";
        berries++;
      }
    }

    while (wolves < 2) {
      let index = Math.floor(Math.random() * GRID_SIZE);
      if (items[index] === "") {
        items[index] = "wolf";
        wolves++;
      }
    }

    return items;
  };

  useEffect(() => {
    setTimeout(() => {
      setBushes(placeItems());
    }, 10);
  }, []);

  const handleClick = (index: number) => {
    if (gameOver || revealed[index]) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;

    if (bushes[index] === "berry") {
      setMessage("You found a berry!");
    } else if (bushes[index] === "wolf") {
      setMessage("A wolf! Game over!");
      setGameOver(true);
      setPopupMessage("A wolf! Game over!");
      setShowPopup(true);
    }

    setRevealed(newRevealed);
  };

  const resetGame = () => {
    setBushes([]);
    setTimeout(() => {
      setBushes(placeItems());
      setRevealed(new Array(GRID_SIZE).fill(false));
      setGameOver(false);
      setMessage("");
      setPopupMessage("");
      setShowPopup(false);
    }, 10);
  };

  return (
    <div>
      <ExitButton label="Exit" href="/" />
      <div className="game-container">
        <h1>Scavenger Game</h1>
        <div className="grid">
          {bushes.map((item, index) => (
            <div key={index} className={`bush ${revealed[index] ? "revealed" : ""}`} onClick={() => handleClick(index)}>
              {revealed[index] ? (
                item === "berry" ? (
                  <Image src="/scavenge_images/berries.png" alt="Berry" width={80} height={80} />
                ) : item === "wolf" ? (
                  <Image src="/scavenge_images/wolf.png" alt="Wolf" width={80} height={80} />
                ) : null
              ) : (
                <Image src="/environment_images/bush1.png" alt="Bush" width={80} height={80} />
              )}
            </div>
          ))}
        </div>

        {/* Popup for Game Over */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <Image src="/scavenge_images/wolf.png" alt="Wolf" width={300} height={300} />
              <h2>A predator attacked you! Game Over.</h2>
              <Link href="/" passHref>
                <button className="eight-bit-button">Go to Home</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scavenger;
