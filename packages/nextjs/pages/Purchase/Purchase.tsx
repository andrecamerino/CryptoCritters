import React, { useState } from "react";
import Image from "next/image";
import { usePaymentContract } from "../../hooks/usePaymentContract";
import "./Purchase.css";
import { ethers } from "ethers";
import ExitButton from "~~/Components/ExitButton/ExitButton";

const Purchase = () => {
  const [coinAmount, setCoinAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { contract, isConnected, connect, disconnect } = usePaymentContract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  );

  // Conversion rate: 1 ETH = 1000 coins
  const ETH_TO_COINS_RATE = 1000;

  const handlePurchase = async (coins: number) => {
    if (!isConnected || !contract) {
      alert("Please connect your wallet first!");
      return;
    }

    setLoading(true);

    try {
      // Convert coins to ETH (1 ETH = 1000 coins)
      const ethAmount = coins / ETH_TO_COINS_RATE;
      const ethAmountWei = ethers.parseEther(ethAmount.toString());

      // Make the deposit transaction
      const tx = await contract.deposit(ethAmountWei);
      await tx.wait();

      setCoinAmount(coins);
      alert(`Successfully purchased ${coins} coins!`);
    } catch (error) {
      console.error("Error purchasing coins:", error);
      alert("There was an error with your purchase. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <ExitButton href="/" label="Exit" />
      <div className="purchase-container">
        <h1>Buy Critter Coins</h1>

        {!isConnected ? (
          <button onClick={connect} className="connect-wallet-button">
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="coin-options-container">
              <div className="coin-option" onClick={() => handlePurchase(10)}>
                <Image src="/coin_images/coin1.png" alt="100 Coins" width={150} height={150} className="coin-image" />
                <p className="coin-label">10 Coins</p>
                <p className="eth-price">0.01 ETH</p>
                <button className="purchase-button" disabled={loading}>
                  {loading ? "Processing..." : "Purchase"}
                </button>
              </div>
              <div className="coin-option" onClick={() => handlePurchase(20)}>
                <Image src="/coin_images/coin2.png" alt="200 Coins" width={150} height={150} className="coin-image" />
                <p className="coin-label">20 Coins</p>
                <p className="eth-price">0.02 ETH</p>
                <button className="purchase-button" disabled={loading}>
                  {loading ? "Processing..." : "Purchase"}
                </button>
              </div>
              <div className="coin-option" onClick={() => handlePurchase(40)}>
                <Image src="/coin_images/coin3.png" alt="400 Coins" width={150} height={150} className="coin-image" />
                <p className="coin-label">40 Coins</p>
                <p className="eth-price">0.04 ETH</p>
                <button className="purchase-button" disabled={loading}>
                  {loading ? "Processing..." : "Purchase"}
                </button>
              </div>
            </div>

            {coinAmount !== null && (
              <div className="result">
                <h3>You Purchased:</h3>
                <p>{coinAmount} Critter Coins</p>
              </div>
            )}

            <button onClick={disconnect} className="disconnect-wallet-button">
              Disconnect Wallet
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Purchase;
