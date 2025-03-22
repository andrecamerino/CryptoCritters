import React, { useState } from "react";
import "./tablet.css";

const Popup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Sample images (replace with actual image paths)
  const images = [
    "/tablet_images/bat_wooden_tablet.png",
    "/tablet_images/bKakapo_tablet.png",
    "/tablet_images/blue_penguin_tablet.png",
    "/tablet_images/Brown_kiwi_tablet.png",
    "/tablet_images/seal_tablet.png",
    "/tablet_images/SeaLion_tablet.png",
    "/tablet_images/stick_wooden_panel.png",
    "/tablet_images/tern_tablet.png",
    "/tablet_images/weta_tablet.png",
    "/tablet_images/Yelloweye_tablet.png",
  ];

  return (
    <div className="button-container">
      {/* Button to open main popup - Hidden when popup is open */}
      {!isOpen && (
        <button
          className="critterdex-button"
          onClick={() => setIsOpen(true)}
        >
          Critterdex
        </button>
      )}

      {/* Main Popup with Image Gallery */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-2/3"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-2xl text-black font-bold mb-4">Welcome to the Critterdex</h2>
            <p className="text-lg text-black mb-4">Click a Critter to view it in detail</p>

            {/* Image Gallery */}
            <div className="grid grid-cols-5 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="hover-large w-48 h-48 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={img}
                    alt={`Critter ${index + 1}`}
                    className="w-full h-full object-cover transform transition-all duration-300 hover:scale-105"
                    onClick={() => setSelectedImage(img)}
                  />
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              className="x-hover text-red-500 text-xl float-right mt-4"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Popup for Selected Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Selected Critter" className="max-w-[700px] max-h-[700px] w-auto h-auto" />
            <button
              className="text-red-500 text-xl float-right mt-4 x-hover"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;