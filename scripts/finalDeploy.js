const hre = require("hardhat");

async function main() {
  // Starting and deploying the contract
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const Voting = await hre.ethers.getContractFactory("Voting");
  const votingContract = await Voting.deploy();
  await votingContract.waitForDeployment();

  console.log(votingContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
