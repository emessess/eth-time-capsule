pragma solidity ^0.4.2;

contract Capsule {

  struct Message {
    bytes32 blurb;
    uint timeStamp;
  }

  mapping (address => Message) messages;

  function setMessage(bytes32 message) public {
    messages[msg.sender].blurb = message;
    messages[msg.sender].timeStamp = now;

  }

  function getMessage() returns(bytes32) {
    uint timePassed = now - messages[msg.sender].timeStamp;
    require(timePassed > 180);

    return messages[msg.sender].blurb;

  }

}