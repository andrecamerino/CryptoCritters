import { useState } from "react";
import { usePaymentContract } from "../../hooks/usePaymentContract";
import { ethers } from "ethers";

interface PaymentInterfaceProps {
  contractAddress?: string;
}

export function PaymentInterface({ contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" }: PaymentInterfaceProps) {
  const { contract, isConnected, connect, disconnect } = usePaymentContract(contractAddress);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [balance, setBalance] = useState<string>("0");

  const handleDeposit = async () => {
    if (!contract || !amount) return;
    try {
      const amountWei = ethers.parseEther(amount);
      await contract.deposit(amountWei);
    } catch (error) {
      console.error("Deposit failed:", error);
    }
  };

  const handleWithdraw = async () => {
    if (!contract || !amount) return;
    try {
      const amountWei = ethers.parseEther(amount);
      await contract.withdraw(amountWei);
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
  };

  const handleSendPayment = async () => {
    if (!contract || !amount || !recipient) return;
    try {
      const amountWei = ethers.parseEther(amount);
      await contract.sendPayment(recipient, amountWei);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const checkBalance = async () => {
    if (!contract) return;
    try {
      const balanceWei = await contract.getBalance(await contract.getConservationWallet());
      setBalance(ethers.formatEther(balanceWei));
    } catch (error) {
      console.error("Failed to get balance:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Interface</h2>
      
      {!isConnected ? (
        <button
          onClick={connect}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount (ETH)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              step="0.000000000000000001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Recipient Address</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0x..."
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={handleDeposit}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Deposit
            </button>
            <button
              onClick={handleWithdraw}
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
            >
              Withdraw
            </button>
            <button
              onClick={handleSendPayment}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              Send Payment
            </button>
            <button
              onClick={checkBalance}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Check Balance
            </button>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">Current Balance: {balance} ETH</p>
          </div>

          <button
            onClick={disconnect}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
} 

export default PaymentInterface;