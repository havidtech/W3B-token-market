# W3B-token-market
Last Days of Web3Bridge Cohort VI Task 1

This contract creates a market for only two tokens. Price feeds are gotten from chainlink.
The tokens must be EIP20 compliant and should have a supported price feed from chain link that gives the price of the token in ETH. 

# To Setup for verification
1) Clone the repository and run npm install
2) Edit sampleData/index.ts to taste
3) Edit and run scripts/deployTokenSwap 
4) Edit and Run scripts/addLiquidity in order to Pump liquidity into the market. Do this step twice, once for each token.
5) Edit and Run scripts/viewBalance
6) Edit and Run scripts/swapToken
7) Do step 5 to confirm that balance has been updated.
