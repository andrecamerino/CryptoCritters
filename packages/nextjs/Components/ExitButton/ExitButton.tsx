import React from "react";
import Link from "next/link";
// Importing Link from Next.js
import "./ExitButton.css";

// Ensure this is the correct path to your CSS file

interface ExitButtonProps {
  label: string;
  href: string; // You can keep the href prop for the link destination
}

const ExitButton: React.FC<ExitButtonProps> = ({ label, href }) => {
  return (
    <Link href={href}>
      <span className="exit-button">
        <img src="/door-open.svg" alt="Leave Icon" className="button-icon" />
        {label}
      </span>
    </Link>
  );
};

export default ExitButton;
