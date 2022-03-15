import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { TokenSwap } from "../typechain/TokenSwap";
// eslint-disable-next-line node/no-missing-import
import {
  ERC20TokenAddresses,
  sampleTokenHolder,
  tokenSwapContractAddress,
  // eslint-disable-next-line node/no-missing-import
} from "../sampleData";

async function swapToken() {
  const sourceTokenAddress = ERC20TokenAddresses.USDC;
  const destinationTokenAddress = ERC20TokenAddresses.USDT;
  const amount = 10;
  const token = (await ethers.getContractAt(
    "TokenSwap",
    tokenSwapContractAddress
  )) as TokenSwap;

  // Carry out the impersonation
  // @ts-ignore
  // eslint-disable-next-line no-undef
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [sampleTokenHolder],
  });

  // Call Get Signer
  const signer = await ethers.getSigner(sampleTokenHolder);

  console.log(
    await token
      .connect(signer)
      .swap(sourceTokenAddress, destinationTokenAddress, amount)
  );
}

swapToken().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
