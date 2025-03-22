import React from "react";
import Button from "../Button/Button";
import Tablet from "../tablet_popup/tablet";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
      <Button label="Eggs" href="/EggStore/EggStore" />
      </div>
      <Button label="Coins" href="/Purchase/Purchase" />
      <div className="mt-10 z-20 relative">{<Tablet />}</div>
      <div>
      <Button label="Play!" href="https://example.com" />
      
      </div>
    </div>
  );
};

export default Footer;
