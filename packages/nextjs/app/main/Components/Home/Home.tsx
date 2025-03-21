"use client";

import React from "react";
import Button from "../Button/Button";
import Cloud from "../Cloud/Cloud";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Animal from "../Animal/Animal";
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
