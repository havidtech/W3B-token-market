import { ethers } from "hardhat";

async function deployTokenSwap() {
  // Tokens to form market
  const token1Address = "token1Address"; // Change this
  const token2Address = "token2Address"; // Change this
  const token1ToEthFeed = "token1ToEthFeed"; // Change this
  const token2ToEthFeed = "token2ToEthFeed"; // Change this

  // We get the contract to deploy
  const TokenSwap = await ethers.getContractFactory("TokenSwap");
  const tokenSwap = await TokenSwap.deploy(
    token1Address,
    token2Address,
    token1ToEthFeed,
    token2ToEthFeed
  );

  await tokenSwap.deployed();

  console.log("TokenSwap deployed to:", tokenSwap.address);
}

deployTokenSwap().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
