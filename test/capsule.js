const Capsule = artifacts.require('./Capsule.sol');
const web3 = require(web3)

contract('Capsule', (accounts) => {
  it('...should store a message "hello world"', () => {
      return Capsule.deployed()
    .then((instance) => {
      let simpleStorageInstance = instance;

      return simpleStorageInstance.setMessage('hello world', {from: accounts[0]});
    })
    .then(() => simpleStorageInstance.get.call())
    .then((returnedMessage) => {
      assert.equal(returnedMessage, 'hello world', 'the message did not return correctly');
    });
  });
});