import { ethers } from "hardhat";

async function main() {
  // Get the deployer's address
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // For testing purposes, we'll use the deployer's address as the conservation wallet
  // In production, you should replace this with your actual conservation wallet address
  const conservationWallet = deployer.address;
  
  // Deploy the PaymentContract
  const PaymentContract = await ethers.getContractFactory("PaymentContract");
  const paymentContract = await PaymentContract.deploy(conservationWallet);
  await paymentContract.waitForDeployment();

  const address = await paymentContract.getAddress();
  console.log("PaymentContract deployed to:", address);
  console.log("Conservation wallet set to:", conservationWallet);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 