import { ethers } from "hardhat";
import {
  ERC20TokenAddresses,
  liquidityProvider,
  tokenSwapContractAddress,
  // eslint-disable-next-line node/no-missing-import
} from "../sampleData";

async function addLiquidity() {
  const token = await ethers.getContractAt(
    "IERCToken",
    ERC20TokenAddresses.USDT
  );

  // Carry out the impersonation
  // @ts-ignore
  // eslint-disable-next-line no-undef
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [liquidityProvider.USDT],
  });

  // Call Get Signer
  const signer = await ethers.getSigner(liquidityProvider.USDT);
  await token
    .connect(signer)
    .transfer(
      tokenSwapContractAddress,
      await token.balanceOf(liquidityProvider.USDT)
    );
}

addLiquidity().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
