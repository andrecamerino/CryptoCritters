import React, { useState } from "react";

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
    <div>
      {/* Button to open main popup */}
      <button
        className="bg-[url('/wood.jpg')] bg-cover bg-no-repeat text-white px-4 py-2 rounded"
        style={{ imageRendering: "pixelated" }}
        onClick={() => setIsOpen(true)}
      >
        Critterdex
      </button>

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
            <p className="text-lg text-black mb-4">Click an image to view it in detail</p>

            {/* Image Gallery */}
            <div className="grid grid-cols-5 gap-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Critter ${index + 1}`}
                  className="w-24 h-24 object-cover cursor-pointer border-2 border-gray-300 hover:border-blue-500"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            {/* Close Button */}
            <button
              className="text-red-500 text-xl float-right mt-4"
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
              className="text-red-500 text-xl float-right mt-4"
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
