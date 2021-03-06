/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk');
const spawn = require('cross-spawn');

/**
 * Spawn a package manager installation with either Yarn or NPM.
 *
 * @returns A Promise that resolves once the installation is finished.
 */
const install = (
  root,
  dependencies,
  { useYarn, isOnline, devDependencies }
) => {
  /**
   * NPM-specific command-line flags.
   */
  const npmFlags = [];
  /**
   * Yarn-specific command-line flags.
   */
  const yarnFlags = [];
  /**
   * Return a Promise that resolves once the installation is finished.
   */
  return new Promise((resolve, reject) => {
    let args = [];
    let command = useYarn ? 'yarnpkg' : 'npm';

    if (dependencies && dependencies.length) {
      /**
       * If there are dependencies, run a variation of `{displayCommand} add`.
       */
      if (useYarn) {
        /**
         * Call `yarn add --exact (--offline)? (-D)? ...`.
         */
        args = ['add', '--exact', '--legacy-peer-deps'];
        if (!isOnline) args.push('--offline');
        args.push('--cwd', root);
        if (devDependencies) args.push('--dev');
        args.push(...dependencies);
      } else {
        /**
         * Call `npm install [--save|--save-dev] ...`.
         */
        args = ['install', '--save-exact', '--legacy-peer-deps'];
        args.push(devDependencies ? '--save-dev' : '--save');
        args.push(...dependencies);
      }
    } else {
      /**
       * If there are no dependencies, run a variation of `{displayCommand}
       * install`.
       */
      args = ['install'];
      if (useYarn) {
        if (!isOnline) {
          console.log(chalk.yellow('You appear to be offline.'));
          console.log(chalk.yellow('Falling back to the local Yarn cache.'));
          console.log();
          args.push('--offline');
        }
      } else {
        if (!isOnline) {
          console.log(chalk.yellow('You appear to be offline.'));
          console.log();
        }
      }
    }
    /**
     * Add any package manager-specific flags.
     */
    if (useYarn) {
      args.push(...yarnFlags);
    } else {
      args.push(...npmFlags);
    }
    /**
     * Spawn the installation process.
     */
    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
    });
    child.on('close', (code) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(' ')}` });
        return;
      }
      resolve();
    });
  });
};

exports.install = install;
