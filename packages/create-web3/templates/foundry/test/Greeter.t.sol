// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import '../lib/forge-std/src/Test.sol';
import {Greeter} from '../src/Greeter.sol';

contract GreeterTest is Test {
    Greeter greeter;

    function setUp() public {
        greeter = new Greeter('Hello, world!');
    }

    function testGreet() public {
        assertEq(greeter.greet(), 'Hello, world!');
    }

    function testSetGreeting() public {
        greeter.setGreeting('Hello, universe!');
        assertEq(greeter.greet(), 'Hello, universe!');
    }
}
