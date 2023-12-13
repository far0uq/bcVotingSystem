const hre = require("hardhat");

async function main() {
  // Starting and deploying the contract
  const lottery = await hre.ethers.getContractFactory("Lottery");
  const deployedContract = await lottery.deploy();
  await deployedContract.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
