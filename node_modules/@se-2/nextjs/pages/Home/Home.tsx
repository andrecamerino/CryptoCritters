"use client";

import React from "react";
import Animal from "../../Components/Animal/Animal";
import Button from "../../Components/Button/Button";
import Cloud from "../../Components/Cloud/Cloud";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Home.css";

const Home: React.FC = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="home">
      <Header />
      <Cloud height="-120px" speed="300s" direction="reverse" size={180} />
      <Cloud height="-120px" speed="180s" direction="normal" size={240} />
      <Cloud height="-120px" speed="100s" direction="reverse" size={400} />
      <Animal />
      <Footer />
    </div>
  );
};

export default Home;
