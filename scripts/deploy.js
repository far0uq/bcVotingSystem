const hre = require("hardhat");

async function main() {
  // Starting and deploying the contract
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const Voting = await hre.ethers.getContractFactory("Voting");
  const votingContract = await Voting.deploy();
  await votingContract.waitForDeployment();

  const amount = { value: hre.ethers.parseEther("1.0") };
  await votingContract.connect(owner).addCandidate("Joe Biden", amount);
  await votingContract.connect(owner).addCandidate("McDonald Trumper", amount);
  await votingContract.connect(owner).addCandidate("NoiceMan Noicer", amount);
  await votingContract.connect(owner).addCandidate("Sam Jack", amount);
  await votingContract.connect(owner).commenceVoting();

  await votingContract.connect(from1).vote(0);
  await votingContract.connect(from2).vote(1);
  await votingContract.connect(from3).vote(0);

  await votingContract.connect(owner).endVoting();

  console.log(await votingContract.connect(owner).getWinner());
  console.log(await votingContract.connect(owner).getVoterHistory());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
