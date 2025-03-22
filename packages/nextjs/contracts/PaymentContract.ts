import { ethers } from "ethers";

export const PaymentContractABI = [
  "function deposit() public payable",
  "function withdraw(uint256 amount) public",
  "function sendPayment(address to, uint256 amount) public",
  "function getBalance(address account) public view returns (uint256)",
  "function updateFeePercentage(uint256 newFeePercentage) external",
  "function updateConservationWallet(address newWallet) external",
  "function conservationWallet() public view returns (address)",
  "function feePercentage() public view returns (uint256)",
  "event PaymentReceived(address indexed from, uint256 amount)",
  "event ConservationFeePaid(address indexed from, uint256 amount)",
  "event PaymentSent(address indexed to, uint256 amount)",
  "event WithdrawalSuccessful(address indexed to, uint256 amount)",
  "event ConservationWalletUpdated(address indexed newWallet)",
  "event FeePercentageUpdated(uint256 newFeePercentage)"
];

export class PaymentContract {
  private contract: ethers.Contract;

  constructor(address: string, provider: ethers.Provider | ethers.Signer) {
    this.contract = new ethers.Contract(address, PaymentContractABI, provider);
  }

  // Connect to the contract
  static async connect(address: string, provider: ethers.Provider | ethers.Signer): Promise<PaymentContract> {
    return new PaymentContract(address, provider);
  }

  // Contract functions
  async deposit(amount: bigint): Promise<ethers.ContractTransactionResponse> {
    return this.contract.deposit({ value: amount });
  }

  async withdraw(amount: bigint): Promise<ethers.ContractTransactionResponse> {
    return this.contract.withdraw(amount);
  }

  async sendPayment(to: string, amount: bigint): Promise<ethers.ContractTransactionResponse> {
    return this.contract.sendPayment(to, amount);
  }

  async getBalance(account: string): Promise<bigint> {
    return this.contract.getBalance(account);
  }

  async updateFeePercentage(newFeePercentage: number): Promise<ethers.ContractTransactionResponse> {
    return this.contract.updateFeePercentage(newFeePercentage);
  }

  async updateConservationWallet(newWallet: string): Promise<ethers.ContractTransactionResponse> {
    return this.contract.updateConservationWallet(newWallet);
  }

  async getConservationWallet(): Promise<string> {
    return this.contract.conservationWallet();
  }

  async getFeePercentage(): Promise<number> {
    return this.contract.feePercentage();
  }

  // Event listeners
  onPaymentReceived(callback: (from: string, amount: bigint) => void): void {
    this.contract.on("PaymentReceived", callback);
  }

  onConservationFeePaid(callback: (from: string, amount: bigint) => void): void {
    this.contract.on("ConservationFeePaid", callback);
  }

  onPaymentSent(callback: (to: string, amount: bigint) => void): void {
    this.contract.on("PaymentSent", callback);
  }

  onWithdrawalSuccessful(callback: (to: string, amount: bigint) => void): void {
    this.contract.on("WithdrawalSuccessful", callback);
  }
} 