import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePaymentContract } from '../../hooks/usePaymentContract';
import "./Header.css";

const Header = () => {
  const { signer, isConnected, connect } = usePaymentContract("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  const [address, setAddress] = useState<string>('');
  const [coinBalance, setCoinBalance] = useState<number>(0);

  useEffect(() => {
    // Check for previously connected wallet
    const wasConnected = localStorage.getItem('walletConnected');
    if (wasConnected === 'true') {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    if (signer) {
      signer.getAddress().then(addr => {
        setAddress(addr);
        localStorage.setItem('walletConnected', 'true');
      });
    } else {
      localStorage.removeItem('walletConnected');
    }
  }, [signer]);

  const formattedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <div className="header">
      <div className="wallet-section">
        <div className="coin-counter">
          <Image 
            src="/coin_images/single_coin.png"
            alt="Coin"
            width={40}
            height={40}
            className="coin-icon"
          />
          <span className="coin-amount">{coinBalance}</span>
        </div>
        {isConnected ? (
          <div className="wallet-info">
            <div className="wallet-address">{formattedAddress}</div>
          </div>
        ) : (
          <button className="connect-button" onClick={connect}>
            Connect Wallet
          </button>
        )}
      </div>
      <div className="logo-section">
        <Image 
          src="/logo.png"
          alt="Logo"
          width={130}
          height={100}
          className="header-image"
        />
      </div>
    </div>
  );
}

export default Header;
