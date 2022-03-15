import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { ERC20TokenAddresses, PriceFeedAddresses } from "../sampleData";

async function deployTokenSwap() {
  // Tokens to form market
  const token1Address = ERC20TokenAddresses.USDC; // USDC
  const token2Address = ERC20TokenAddresses.USDT; // USDT
  const token1ToEthFeed = PriceFeedAddresses.USDC_ETH;
  const token2ToEthFeed = PriceFeedAddresses.USDT_ETH;

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
