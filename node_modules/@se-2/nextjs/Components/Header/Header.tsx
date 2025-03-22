import React from 'react';
import Image from 'next/image';
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Image 
        src="/logo.png" // Replace with your actual image path (inside public folder)
        alt="Logo"
        width={150} // Set desired width
        height={80} // Set desired height
        className="header-image"
      />
    </div>
  );
}

export default Header;
