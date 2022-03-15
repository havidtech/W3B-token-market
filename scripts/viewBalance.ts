import { ethers } from "hardhat";
import {
  ERC20TokenAddresses,
  // eslint-disable-next-line no-unused-vars
  sampleTokenHolder,
  tokenSwapContractAddress,
  // eslint-disable-next-line node/no-missing-import
} from "../sampleData";

async function viewBalance() {
  const tokenAddress = ERC20TokenAddresses.USDT;
  const owner = tokenSwapContractAddress;
  const token = await ethers.getContractAt("IERCToken", tokenAddress);

  console.log(await token.balanceOf(owner));
}

viewBalance().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
