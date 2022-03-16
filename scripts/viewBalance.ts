/* eslint-disable no-unused-vars */
/* eslint-disable node/no-missing-import */
import { ethers } from "hardhat";
import {
  ERC20TokenAddresses,
  sampleTokenHolder,
  tokenSwapContractAddress,
} from "../sampleData";

async function viewBalance() {
  const tokenAddress = ERC20TokenAddresses.USDC;
  const owner = sampleTokenHolder;
  const token = await ethers.getContractAt("IERCToken", tokenAddress);

  console.log(await token.balanceOf(sampleTokenHolder));
}

viewBalance().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
