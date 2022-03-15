import { ethers } from "hardhat";

async function approveSpender() {
  const tokenAddress = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";
  const tokenOwner = "0x24BA1542F8a0a20e8251d096213384Cfb0eE3dbC";
  const tokenSwapAddress = "0x59781a1c7e7dcefd724d765b205eb57c6008ca21";
  const token = await ethers.getContractAt("IERCToken", tokenAddress);
  const amount = "10";

  // Carry out the impersonation
  // @ts-ignore
  // eslint-disable-next-line no-undef
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [tokenOwner],
  });

  // Call Get Signer
  const signer = await ethers.getSigner(tokenOwner);

  console.log(await token.connect(signer).balanceOf(signer.address));
  // Try to transfer a token
  await token.connect(signer).approve(tokenSwapAddress, amount);
}

approveSpender().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
