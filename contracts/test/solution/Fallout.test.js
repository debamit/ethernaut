const FalloutFactory = artifacts.require('./levels/FalloutFactory.sol')
const Fallout = artifacts.require('./attacks/Fallout.sol')

const Ethernaut = artifacts.require('./Ethernaut.sol')
const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers')
const utils = require('../utils/TestUtils')

contract('Fallout', function(accounts) {

  let ethernaut
  let level
  let owner = accounts[1]
  let player = accounts[0]

  beforeEach(async () => {
    ethernaut = await Ethernaut.new();
    level = await FalloutFactory.new()
    await ethernaut.registerLevel(level.address)
  });

  it('should allow the player to solve the level', async function() {
    const instance = await utils.createLevelInstance(
        ethernaut, level.address, player, Fallout,
        {from: player}
      )

    await instance.Fal1out()
    assert.equal(await instance.owner(), player)

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