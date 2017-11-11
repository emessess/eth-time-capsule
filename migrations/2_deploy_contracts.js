const SimpleStorage = artifacts.require('./SimpleStorage.sol');
const Capsule = artifacts.require('./Capsule.sol');

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Capsule);
};
