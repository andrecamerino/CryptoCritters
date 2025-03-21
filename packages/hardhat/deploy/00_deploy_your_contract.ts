import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys the PaymentContract using the deployer account and
 * constructor arguments set to the deployer address as the conservation wallet
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployPaymentContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("PaymentContract", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer], // Using deployer as the initial conservation wallet
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to verify deployment
  const paymentContract = await hre.ethers.getContract("PaymentContract", deployer);
  console.log("PaymentContract deployed to:", await paymentContract.getAddress());
  console.log("Conservation wallet set to:", await paymentContract.conservationWallet());
};

export default deployPaymentContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags PaymentContract
deployPaymentContract.tags = ["PaymentContract"];
