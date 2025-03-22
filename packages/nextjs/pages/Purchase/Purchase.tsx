import React, { useState } from "react";
import Image from "next/image";
// Importing the Image component from next/image
import "./Purchase.css";

const Purchase = () => {
  const [coinAmount, setCoinAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async amount => {
    setLoading(true);

    // Simulate the purchase process (here you would call your Web3 or contract method)
    try {
      // Mock purchase (replace this with your Web3 purchase logic)
      const purchasedCoins = await mockPurchaseCoins(amount);
      setCoinAmount(purchasedCoins);
    } catch (error) {
      console.error("Error purchasing coins:", error);
      alert("There was an error with your purchase.");
    }
    setLoading(false);
  };

  // Simulate the purchase process (replace this with actual Web3 logic)
  const mockPurchaseCoins = amount => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(amount); // Just return the amount as a mock result
      }, 1500);
    });
  };

  return (
    <div className="purchase-container">
      <h1>Buy Critter Coins</h1>
      <div className="coin-options-container">
        <div className="coin-option" onClick={() => handlePurchase(100)}>
          <Image src="/coin_images/coin1.png" alt="100 Coins" width={150} height={150} className="coin-image" />
          <p className="coin-label">100 Coins</p>
          <button className="purchase-button">Purchase</button>
        </div>
        <div className="coin-option" onClick={() => handlePurchase(200)}>
          <Image src="/coin_images/coin2.png" alt="200 Coins" width={150} height={150} className="coin-image" />
          <p className="coin-label">200 Coins</p>
          <button className="purchase-button">Purchase</button>
        </div>
        <div className="coin-option" onClick={() => handlePurchase(400)}>
          <Image src="/coin_images/coin3.png" alt="400 Coins" width={150} height={150} className="coin-image" />
          <p className="coin-label">400 Coins</p>
          <button className="purchase-button">Purchase</button>
        </div>
      </div>

      {coinAmount !== null && (
        <div className="result">
          <h3>You Purchased:</h3>
          <p>{coinAmount} Critter Coins</p>
        </div>
      )}
    </div>
  );
};

export default Purchase;