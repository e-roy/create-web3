const fs = require('fs');
const os = require('os');
const path = require('path');
const chalk = require('chalk');
const installDep = require('./install');

const installHardhat = async (appPath, installFlags, typescript) => {
  console.log('running install hardhat');
  const root = path.resolve(appPath);
  /**
   * Create a package.json for the hardhat.
   */
  const packageHardhatJson = {
    name: '@project/hardhat',
    version: '0.1.0',
    private: true,
    scripts: {
      chain: 'hardhat node --network hardhat --no-deploy',
      clean: 'npx hardhat clean',
      deploy:
        'hardhat deploy --export-all ../next-app/contracts/hardhat_contracts.json',
      postdeploy: 'hardhat run scripts/publish.js',
    },
  };
  /**
   * Create hardhat folders and write it to disk.
   */
  fs.writeFileSync(
    path.join(root, 'packages', 'hardhat', 'package.json'),
    JSON.stringify(packageHardhatJson, null, 2) + os.EOL
  );

  /**
   * Default dependencies.
   */
  const dependencies = ['dotenv'];
  /**
   * Default devDependencies.
   */
  const devDependencies = [
    '@nomiclabs/hardhat-ethers',
    '@nomiclabs/hardhat-etherscan',
    '@nomiclabs/hardhat-waffle',
    '@openzeppelin/contracts',
    'chai',
    'ethereum-waffle',
    'ethers@5.6.4',
    'hardhat',
    'hardhat-deploy',
  ];
  /**
   * TypeScript projects will have type definitions and other devDependencies.
   */
  if (typescript) {
    devDependencies.push('typescript');
  }
  /**
   * Install package.json dependencies if they exist.
   */

  let installDir = path.join(root, '/packages/hardhat');

  if (dependencies.length) {
    console.log();
    console.log('Installing dependencies:');
    for (const dependency of dependencies) {
      console.log(`- ${chalk.cyan(dependency)}`);
    }
    console.log();

    await installDep.install(installDir, dependencies, installFlags);
  }
  /**
   * Install package.json devDependencies if they exist.
   */
  if (devDependencies.length) {
    console.log();
    console.log('Installing devDependencies:');
    for (const devDependency of devDependencies) {
      console.log(`- ${chalk.cyan(devDependency)}`);
    }
    console.log();

    const devInstallFlags = { devDependencies: true, ...installFlags };
    await installDep.install(installDir, devDependencies, devInstallFlags);
  }
  console.log();
};

exports.installHardhat = installHardhat;
