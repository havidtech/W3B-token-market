/* eslint-disable node/no-missing-import */
/* eslint-disable no-undef */
import { ethers } from "hardhat";
import { TokenSwap } from "../typechain/TokenSwap";
import {
  ERC20TokenAddresses,
  sampleTokenHolder,
  tokenSwapContractAddress,
} from "../sampleData";
import { IERCToken } from "../typechain";

async function swapToken() {
  const sourceTokenAddress = ERC20TokenAddresses.USDC;
  const destinationTokenAddress = ERC20TokenAddresses.DAI;
  const amount = 10;
  const sourceToken = (await ethers.getContractAt(
    "IERCToken",
    sourceTokenAddress
  )) as IERCToken;

  const tokenSwap = (await ethers.getContractAt(
    "TokenSwap",
    tokenSwapContractAddress
  )) as TokenSwap;

  // Carry out the impersonation
  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [sampleTokenHolder],
  });

  // Call Get Signer
  const signer = await ethers.getSigner(sampleTokenHolder);

  // Approve Spender
  await sourceToken.connect(signer).approve(tokenSwapContractAddress, amount);

  // Swap Token
  await tokenSwap
    .connect(signer)
    .swap(sourceTokenAddress, destinationTokenAddress, amount);
}

swapToken().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
