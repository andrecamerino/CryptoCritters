import React from 'react';
import './Button.css'; // Ensure this is the correct path to your CSS file

interface ButtonProps {
  label: string;
  href: string; // or onClick if you prefer to use a button
}

const Button: React.FC<ButtonProps> = ({ label, href }) => {
  return (
    <a className="eight-bit-button" href={href}>
      {label}
    </a>
  );
};

export default Button;