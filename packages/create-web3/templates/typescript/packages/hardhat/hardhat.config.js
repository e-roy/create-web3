require('@nomiclabs/hardhat-waffle');
require('dotenv').config({ path: '../../.env' });

require('hardhat-deploy');
require('@nomiclabs/hardhat-ethers');

const defaultNetwork = 'localhost';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.10',
  defaultNetwork,

  networks: {
    localhost: {
      chainId: 31337,
    },

    /////////
    // L1 NETWORKS
    /////////

    // mainnet: {
    //   chainId: 1,
    //   url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
    // },

    // L1 TEST NETWORKS

    // ropsten: {
    //   chainId: 3,
    //   url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
    // },
    // rinkeby: {
    //   chainId: 4,
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
    // },
    // goerli: {
    //   chainId: 5,
    //   url: `https://eth-goerli.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
    // },
    // kovan: {
    //   chainId: 42,
    //   url: `https://eth-kovan.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://kovan.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
    // },

    /////////
    // L2 NETWORKS
    /////////

    // polygon: {
    //   chainId: 137,
    //   url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
    // },

    // L2 TEST NETWORKS

    // mumbai: {
    //   chainId: 80001,
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
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
