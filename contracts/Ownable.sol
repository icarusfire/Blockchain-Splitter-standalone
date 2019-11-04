pragma solidity ^0.5.0;

contract Ownable{

    address private owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this action");
        _;
    }

    function setOwner(address _newOwner) public {
        require (msg.sender == owner, "Only owner can set a new owner");
        owner = _newOwner;
    }


}