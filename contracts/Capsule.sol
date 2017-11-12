pragma solidity ^0.4.2;

contract Capsule {
  mapping (address => bytes32) messages;
  mapping (address => uint) timestamps;

  function setMessage(bytes32 message) public {
    messages[msg.sender] = message;
    timestamps[msg.sender] = block.timestamp;
  }

  function getMessage() constant returns(bytes32 message, uint nope) {
    uint diff = getTimeDifference();
    message = "Not yet";
    if (diff > 1000000) {
      message = messages[msg.sender];
    }
  }

  function getTimeStamp() constant returns(uint time) {
    return timestamps[msg.sender];
  }

  function getTimeDifference() constant returns(uint timeDiff) {
    return now - timestamps[msg.sender];
  }
}