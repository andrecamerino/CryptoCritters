import React from "react";
import ImageButton from "../Image_button/Image_button"; // Import the ImageButton component
import Tablet from "../tablet_popup/tablet";
import "./Footer.css"; // Ensure this path is correct

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <ImageButton
          imageSrc="/eggbtn.png"
          href="/EggStore/EggStore"
          altText="Eggs"
          className="egg-store-btn"  // Add a custom class here
        />
      </div>
      <div>
        <ImageButton
          imageSrc="/coinbtn.png"
          href="/Purchase/Purchase"
          altText="Coins"
        />
      </div>
      
      <div>
        <Tablet />
      </div>
      <div>
        <ImageButton
          imageSrc="/playbtn.png"
          href="/Play/play"
          altText="Play!"
          className="play-btn"  // Add a custom class here
        />
      </div>
    </div>
  );
};

export default Footer;
