/* eslint-disable node/no-missing-import */
/* eslint-disable no-undef */
import { ethers } from "hardhat";
import { ERC20TokenAddresses, PriceFeedAddresses } from "../sampleData";

async function deployTokenSwap() {
  // Tokens to form market
  const token1Address = ERC20TokenAddresses.USDC; // USDC
  const token2Address = ERC20TokenAddresses.DAI; // USDT
  const token1ToEthFeed = PriceFeedAddresses.USDC_ETH;
  const token2ToEthFeed = PriceFeedAddresses.DAI_ETH;

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
