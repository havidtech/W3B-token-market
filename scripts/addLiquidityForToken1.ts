/* eslint-disable node/no-missing-import */
/* eslint-disable no-undef */
import { ethers } from "hardhat";
import {
  ERC20TokenAddresses,
  liquidityProvider,
  tokenSwapContractAddress,
} from "../sampleData";

async function addLiquidity() {
  const token = await ethers.getContractAt(
    "IERCToken",
    ERC20TokenAddresses.USDC
  );

  // Carry out the impersonation
  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [liquidityProvider.USDC],
  });

  // Call Get Signer
  const signer = await ethers.getSigner(liquidityProvider.USDC);
  await token
    .connect(signer)
    .transfer(
      tokenSwapContractAddress,
      await token.balanceOf(liquidityProvider.USDC)
    );
}

addLiquidity().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
