pragma solidity ^0.4.2;

contract Capsule {
  mapping (address => bytes32) messages;

  function setMessage(bytes32 message) {
    messages[msg.sender] = message;
  }

  function getMessage() returns(bytes32) {
    return messages[msg.sender];
  }
}