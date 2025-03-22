import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("Deploying PaymentContract with account:", deployer);

  const paymentContract = await deploy("PaymentContract", {
    from: deployer,
    args: [deployer], // Using deployer as the initial conservation wallet
    log: true,
  });

  console.log("PaymentContract deployed to:", paymentContract.address);
};

export default func;
func.id = "deploy_payment";
func.tags = ["PaymentContract"]; 