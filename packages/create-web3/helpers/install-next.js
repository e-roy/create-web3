const fs = require('fs');
const os = require('os');
const path = require('path');
const chalk = require('chalk');
const installDep = require('./install');

const installNext = async (installFlags, typescript) => {
  console.log('running install next');
  const root = path.resolve(appPath);

  /**
   * Create a package.json for the next-app.
   */
  const packageNextJson = {
    name: '@project/next-app',
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    },
  };
  /**
   * Create next-app folders and write it to disk.
   */
  fs.writeFileSync(
    path.join(root, 'packages', 'next-app', 'package.json'),
    JSON.stringify(packageNextJson, null, 2) + os.EOL
  );

  /**
   * These flags will be passed to `install()`.
   */
  // const installFlags = { useYarn, isOnline };
  /**
   * Default dependencies.
   */
  const dependencies = [
    'ethers@^5.6.4',
    'latest@^0.2.0',
    'next@12.1.4',
    'react@18.0.0',
    'react-dom@18.0.0',
    'wagmi@^0.2.28',
  ];
  /**
   * Default devDependencies.
   */
  const devDependencies = ['eslint', 'eslint-config-next'];
  /**
   * TypeScript projects will have type definitions and other devDependencies.
   */
  if (typescript) {
    devDependencies.push(
      'typescript@4.6.3',
      '@types/react@18.0.5',
      '@types/node@17.0.25'
    );
  }
  /**
   * Install package.json dependencies if they exist.
   */

  let installDir = path.join(root, '/packages/next-app');

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

exports.installNext = installNext;
