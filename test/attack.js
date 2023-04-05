const { ethers, waffle } = require('hardhat')
const { expect } = require("chai")
const { BigNumber, utils } = require("ethers")

describe("Attack", function () {
    it("Should be able to guess the exact number", async function() {
        // Deploy the Game Contract
        const Game = await ethers.getContractFactory("Game")
        const game = await Game.deploy({ value: utils.parseEther("0.1")})
        await game.deployed()

        console.log("Game Contract Address: ", game.address)

        // Deploy the Attack Contract
        const Attack = await ethers.getContractFactory("Attack");
        const attack = await Attack.deploy(game.address)
        await attack.deployed()

        console.log("Attack Contract Address: ", attack.address)

        // Attack the Game Contract
        const tx = await attack.attack()
        await tx.wait()

        const balanceGame = await game.getBalance()

        expect(balanceGame).to.equal(BigNumber.from("0"))

    })
})