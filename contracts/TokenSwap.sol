//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


interface IERCToken {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address _owner) external view returns (uint256 balance);
    function transfer(address _to, uint256 _value) external returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);
    function approve(address _spender, uint256 _value) external returns (bool success);
    function allowance(address _owner, address _spender) external view returns (uint256 remaining);
}


contract TokenSwap {
    AggregatorV3Interface internal token1ToEth;
    AggregatorV3Interface internal token2ToEth;


    address private token1Address;
    address private token2Address;

    constructor(address _token1Address, address _token2Address, address token1ToEthFeed, address token2ToEthFeed) {
        token1Address = _token1Address;
        token2Address = _token2Address;

        token1ToEth = AggregatorV3Interface(token1ToEthFeed);
        token2ToEth = AggregatorV3Interface(token2ToEthFeed);
    }

    function swap(address _sourceTokenAddress, address _destinationTokenAddress, uint amount) public returns (bool){

        // Assert that token is supported
        require(isSwapValid(_sourceTokenAddress, _destinationTokenAddress), "Not supported");

        // Require sufficient balance of initiator
        require(isBalanceSufficient(_sourceTokenAddress, msg.sender, amount), "Insufficient Balance");

        // Calculate amount of destination token
        uint destinationAmount = computeDestinationAmount(_sourceTokenAddress, amount); 

        // Require sufficient liquidity of the market
        require(isBalanceSufficient(_destinationTokenAddress, address(this), destinationAmount), "Insufficient Market Liquidity");

        // Do swap accordingly
        swapToken(_sourceTokenAddress, _destinationTokenAddress, msg.sender, amount, destinationAmount);

        return true;
    }

    function computeDestinationAmount(address _sourceTokenAddress, uint amount) public view returns (uint) {

        uint _sourceTokenToEth;
        uint _destinationTokenToEth;
        int price;
        if(_sourceTokenAddress == token1Address){
              (
            /*uint80 roundID*/,
            price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) =  token1ToEth.latestRoundData();
        _sourceTokenToEth = uint(price);

        (
            /*uint80 roundID*/,
            price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) =  token2ToEth.latestRoundData();
        _destinationTokenToEth = uint(price);
        }else{
                          (
            /*uint80 roundID*/,
            price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) =  token2ToEth.latestRoundData();
        _sourceTokenToEth = uint(price);

        (
            /*uint80 roundID*/,
            price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) =  token1ToEth.latestRoundData();
        _destinationTokenToEth = uint(price);
        }

       return (_sourceTokenToEth * amount ) / _destinationTokenToEth;
    }

    function isBalanceSufficient(address _tokenAddress, address _owner, uint amount) internal view returns (bool){
        IERCToken token = IERCToken(_tokenAddress);
        return token.balanceOf(_owner) >= amount;
    }

    function isSwapValid(address _token1, address _token2) internal view returns (bool){
        return (_token1 != _token2) && (_token1 == token1Address || _token1 == token2Address ) && (_token2 == token1Address || _token2 == token2Address );
    }

    function swapToken(address _sourceTokenAddress, address _destinationTokenAddress, address _initiator, uint _sourceAmount, uint _destinationAmount) internal{
        IERCToken(_sourceTokenAddress).transferFrom(_initiator, address(this), _sourceAmount);
        IERCToken(_destinationTokenAddress).transfer(_initiator, _destinationAmount);
    }
}
