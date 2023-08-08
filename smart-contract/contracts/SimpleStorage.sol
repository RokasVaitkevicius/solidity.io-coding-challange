// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract SimpleStorage {
    uint public data;
    event DataChanged(uint newValue);

    function set(uint x) public {
        data = x;
        emit DataChanged(x);
    }

    function get() public view returns (uint) {
        return data;
    }
}
