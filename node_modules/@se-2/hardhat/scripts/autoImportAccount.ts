import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const hre: HardhatRuntimeEnvironment = require("hardhat");
  
  // Read the private key from .env
  const envPath = path.join(__dirname, "../.env");
  const envContent = fs.readFileSync(envPath, "utf8");
  const privateKey = envContent.match(/PRIVATE_KEY=(.*)/)?.[1];

  if (!privateKey) {
    console.error("No private key found in .env file");
    return;
  }

  // Import the account
  const wallet = new hre.ethers.Wallet(privateKey);
  console.log("Account imported:", wallet.address);
  
  // Save the account to deployments
  const accountsPath = path.join(__dirname, "../deployments/accounts.json");
  const accounts = {
    deployer: {
      address: wallet.address,
      privateKey: privateKey,
    },
  };
  
  fs.writeFileSync(accountsPath, JSON.stringify(accounts, null, 2));
  console.log("Account saved to deployments/accounts.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 