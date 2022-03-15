//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TokenSwap {
    address private token1Address;
    address private token2Address;

    constructor(address _token1Address, address _token2Address) {
        token1Address = _token1Address;
        token2Address = _token2Address;
    }

    function swap(address _from, address _to, uint amount) public returns (bool){

        // Assert that token is supported

        // Require sufficient balance of initiator

        // Require sufficient liquidity of the market

        // Calculate amount of destination token

        // Do transfers accordingly
    }

    function computeToAmount(address _fromToken, address _toToken, uint amount) public pure returns (uint) {
    }

    function isFromBalanceSufficient(address _tokenAddress, uint amount) internal returns (bool){

    }

    function isMarketLiquiditySufficient(address _tokenAddress, uint amount) internal returns (bool) {

    }

    function isTokenSupported(address _token) internal returns (bool){

    }

    function transferFromToken(address _token, uint amount) internal returns (bool){

    }

    function transferToToken(address _token, address _to,  uint amount) internal returns (bool) {

    }
}
