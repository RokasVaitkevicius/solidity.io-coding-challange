import { ethers } from 'hardhat';

async function main() {
  const simpleStorage = await ethers.deployContract('SimpleStorage');

  await simpleStorage.waitForDeployment();

  console.log(`Deployed to: ${simpleStorage.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
