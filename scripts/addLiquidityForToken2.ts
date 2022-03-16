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
    ERC20TokenAddresses.DAI
  );

  // Carry out the impersonation
  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [liquidityProvider.DAI],
  });

  // Call Get Signer
  const signer = await ethers.getSigner(liquidityProvider.DAI);
  await token
    .connect(signer)
    .transfer(
      tokenSwapContractAddress,
      await token.balanceOf(liquidityProvider.DAI)
    );
}

addLiquidity().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
