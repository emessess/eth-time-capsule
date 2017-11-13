pragma solidity ^0.4.2;

contract Capsule {
  mapping (address => bytes32) public messages;

  function setMessage(bytes32 message) public {
    messages[msg.sender] = message;
  }

  function getMessage() constant returns(bytes32) {
    return messages[msg.sender];
  }
}