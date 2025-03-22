import React from 'react';
import Link from 'next/link'; // Importing Link from Next.js
import './Button.css'; // Ensure this is the correct path to your CSS file

interface ButtonProps {
  label: string;
  href: string; // You can keep the href prop for the link destination
}

const Button: React.FC<ButtonProps> = ({ label, href }) => {
  return (
    <Link href={href}>
      <span className="eight-bit-button">
        {label}
      </span>
    </Link>
  );
};

export default Button;