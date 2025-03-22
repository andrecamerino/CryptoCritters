import React, { useState } from "react";
import Button from "../Button/Button";

const Popup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Button to open popup */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        <img src="packages\nextjs\public\tablet_images\tablet.png" alt="Critterdex" className="w-35 h-8"/>
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsOpen(false)} // Close when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-1/3"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              className="text-red-500 text-xl float-right"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <p className="mt-4">Hello! This is a custom popup.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
