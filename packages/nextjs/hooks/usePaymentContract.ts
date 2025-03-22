import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { PaymentContract } from "../contracts/PaymentContract";

export function usePaymentContract(contractAddress: string) {
  const [contract, setContract] = useState<PaymentContract | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    async function setupProvider() {
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        
        // Check if already connected
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          setSigner(signer);
          const contract = await PaymentContract.connect(contractAddress, signer);
          setContract(contract);
          setIsConnected(true);
        }
      }
    }
    setupProvider();
  }, [contractAddress]);

  const connect = async () => {
    if (!provider) return;

    try {
      const signer = await provider.getSigner();
      setSigner(signer);
      
      const contract = await PaymentContract.connect(contractAddress, signer);
      setContract(contract);
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const disconnect = () => {
    setContract(null);
    setSigner(null);
    setIsConnected(false);
  };

  return {
    contract,
    provider,
    signer,
    isConnected,
    connect,
    disconnect,
  };
} 