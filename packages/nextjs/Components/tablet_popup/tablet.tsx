import React, { useState } from "react";
import Button from "../Button/Button";

const Popup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Button to open popup */}
      <button
        className="bg-[url('/wood.jpg')] bg-cover bg-no-repeat text-white px-4 py-2 rounded"
        style={{imageRendering: "pixelated"}}
        onClick={() => setIsOpen(true)}
      >
        Critterdex
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
            <h2 className="text-2x1 text-black font-bold mb-4">Welcome to the Critterdex</h2>
            <p className="text-2x1 text-black font-bold mt-4">Hello! This is a custom popup.</p>
            <button
              className="text-red-500 text-xl float-right"
              onClick={() => setIsOpen(false)}
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
