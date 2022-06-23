// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import '../lib/forge-std/src/Script.sol';
import {Greeter} from '../src/Greeter.sol';

contract GreeterScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        new Greeter('Hello from Foundry!');
    }
}
