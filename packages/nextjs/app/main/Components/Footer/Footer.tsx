import React from 'react';
import './Footer.css';
import Button from '../Button/Button';
import Tablet from '../tablet_popup/tablet';

const Footer = () => {
  return (
    <div className="footer">
      <Button label="Play!" href="https://example.com" />
      <div className="border border-black-500 mt-10">
      <Tablet />
      </div>
      <Button label="Play!" href="https://example.com" />
    </div>
  );
}

export default Footer;