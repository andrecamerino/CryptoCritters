"use client";

import React, { useEffect, useRef } from "react";
import Animal from "../../Components/Animal/Animal";
import Button from "../../Components/Button/Button";
import ImageButton from "~~/Components/Image_button/Image_button";
import Cloud from "../../Components/Cloud/Cloud";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Home.css";

const Home: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    alert("Button clicked!");
  };

  // Play the audio on page load
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <div className="home">
      <Header />
      <Cloud height="-120px" speed="300s" direction="reverse" size={180} />
      <Cloud height="-120px" speed="180s" direction="normal" size={240} />
      <Cloud height="-120px" speed="100s" direction="reverse" size={400} />
      <Animal />
      
      {/* Audio for the home page */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/home.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <Footer />
    </div>
  );
};

export default Home;
