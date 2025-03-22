import React from "react";
import "./Image_button.css"; // Ensure this path is correct

interface ImageButtonProps {
  imageSrc: string;
  href: string;
  altText: string;
  className?: string; // Add className prop
}

const ImageButton: React.FC<ImageButtonProps> = ({ imageSrc, href, altText, className }) => {
  return (
    <a href={href} className={`button-image ${className}`}> {/* Apply className */}
      <img src={imageSrc} alt={altText} />
    </a>
  );
};

export default ImageButton;
