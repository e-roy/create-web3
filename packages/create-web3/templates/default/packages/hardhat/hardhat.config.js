require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: "../../.env" });

require("hardhat-deploy");

const defaultNetwork = "localhost";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",
  defaultNetwork,

  networks: {
    hardhat: {
      chainId: 31337,
    },
    // rinkeby: {
    //   chainId: 4,
    //   url: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
    // },
    // mainnet: {
    //   chainId: 1,
    //   url: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
    // },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
    tokenOwner: 1,
  },
};
