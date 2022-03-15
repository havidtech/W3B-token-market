import { ethers } from "hardhat";

async function viewBalance() {
  const tokenAddress = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";
  const tokenOwner = "0x24BA1542F8a0a20e8251d096213384Cfb0eE3dbC";
  const token = await ethers.getContractAt("IERCToken", tokenAddress);

  console.log(await token.balanceOf(tokenOwner));
}

viewBalance().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
