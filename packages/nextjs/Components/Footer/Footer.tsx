import React from "react";
import Button from "../Button/Button";
import Tablet from "../tablet_popup/tablet";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <Button label="Play!" href="/Eggstore" />
      <div className="border border-black-500 mt-10">{/* <Tablet /> */}</div>
      <Button label="Play!" href="https://example.com" />
    </div>
  );
};

export default Footer;
