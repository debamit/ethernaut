const FallbackFactory = artifacts.require('./levels/FallbackFactory.sol')
const Fallback = artifacts.require('./attacks/Fallback.sol')

const Ethernaut = artifacts.require('./Ethernaut.sol')
const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers')
const { assertion } = require('openzeppelin-test-helpers/src/expectRevert')
const utils = require('../utils/TestUtils')


contract('Fallback', (accounts) =>  {

    let ethernaut
    let level
    let owner = accounts[1]
    let player = accounts[0]
  
    beforeEach(async () =>  {
      ethernaut = await Ethernaut.new();
      level = await FallbackFactory.new()
      await ethernaut.registerLevel(level.address)
    });

    it('should allow the player to solve the level', async () => {
        const instance = await utils.createLevelInstance(
            ethernaut, level.address, player, Fallback,
            {from: player}
          )
        await instance.contribute({from: player, value: web3.utils.toWei('0.0001', 'ether')})
        await web3.eth.sendTransaction({from: player, to: instance.address, value: web3.utils.toWei('0.001', 'ether')})
        await instance.withdraw({from: player})
        // Factory check
        const ethCompleted = await utils.submitLevelInstance(
            ethernaut,
            level.address,
            instance.address,
            player
        )
        assert.equal(ethCompleted, true)
    });

});
