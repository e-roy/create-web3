const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');
const cpy = require('cpy');
const checkWriteable = require('./helpers/is-writeable');
const makeDir = require('./helpers/make-dir');
const checkFolder = require('./helpers/is-folder-empty');
const checkYarn = require('./helpers/should-use-yarn');
const checkOnline = require('./helpers/is-online');
const gitInit = require('./helpers/git');

const installNext = require('./helpers/install-next');
const installHardhat = require('./helpers/install-hardhat');

const init = async ({ appPath, useNpm, typescript }) => {
  console.log('running create app');
  console.log(`appPath: ${appPath}`);
  console.log(`useNpm: ${useNpm}`);
  // console.log(typescript);
  const template = typescript ? 'typescript' : 'default';
  const root = path.resolve(appPath);
  console.log('template: ', template);

  if (!(await checkWriteable.isWriteable(path.dirname(root)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.'
    );
    console.error(
      'It is likely you do not have write permissions for this folder.'
    );
    process.exit(1);
  }

  const appName = path.basename(root);

  await makeDir.makeDir(root);
  if (!checkFolder.isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  await makeDir.makeDir(path.join(root, 'packages'));
  await makeDir.makeDir(path.join(root, 'packages', 'next-app'));
  await makeDir.makeDir(path.join(root, 'packages', 'hardhat'));

  // const useYarn = useNpm ? false : checkYarn.shouldUseYarn();
  const useYarn = useNpm ? false : true;
  const isOnline = !useYarn || (await checkOnline.getOnline());
  const originalDirectory = process.cwd();

  const displayedCommand = useYarn ? 'yarn' : 'npm';
  console.log(`Creating a new Web3 app in ${chalk.green(root)}.`);
  console.log();

  process.chdir(root);

  console.log(chalk.bold(`Using ${displayedCommand}.`));

  /**
   * Create a package.json for the new project.
   */
  const packageJson = {
    name: 'create-web3',
    version: '0.0.1',
    description: 'mono repo with hardhat and next',
    main: 'index.js',
    private: true,
    scripts: {
      dev: 'yarn workspace @project/next-app dev',
      build: 'yarn workspace @project/next build',
      test: 'yarn workspace @project/next start',
      chain: 'yarn workspace @project/hardhat chain',
      clean: 'yarn workspace @project/hardhat clean',
      deploy: 'yarn workspace @project/hardhat deploy',
    },
    workspaces: {
      packages: ['packages/*'],
      nohoist: [
        '**/@graphprotocol/graph-ts',
        '**/@graphprotocol/graph-ts/**',
        '**/hardhat',
        '**/hardhat/**',
        '**/hardhat-ts',
        '**/hardhat-ts/**',
      ],
    },
  };
  /**
   * Write it to disk.
   */
  // fs.writeFileSync(
  //   path.join(root, 'package.json'),
  //   JSON.stringify(packageJson, null, 2) + os.EOL
  // );

  /**
   * These flags will be passed to `install()`.
   */
  // const installFlags = { useYarn, isOnline };
  /**
   * Create Next package.json and install dependencies.
   */
  // await installNext.installNext(appPath, installFlags, typescript);
  /**
   * Create hardhat package.json and install dependencies.
   */
  // await installHardhat.installHardhat(appPath, installFlags, typescript);

  console.log();
  /**
   * Copy the template files to the target directory.
   */
  await cpy('**', root, {
    parents: true,
    cwd: path.join(__dirname, 'templates', template), //for seperate templated folders
    // cwd: path.join(__dirname, 'template'), //for single template
    filter: (name) => {
      // console.log('file name : ', name);
      if (
        name.relativePath === './packages/hardhat/package.json' ||
        name.relativePath === './packages/next-app/package.json'
      ) {
        return false;
      }
      return true;
    },
    rename: (name) => {
      switch (name) {
        case 'gitignore':
        case 'eslintrc.json': {
          return '.'.concat(name);
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case 'README-template.md': {
          return 'README.md';
        }
        default: {
          return name;
        }
      }
    },
  });

  if (gitInit.tryGitInit(root)) {
    console.log('Initialized a git repository.');
    console.log();
  }

  let cdpath = '';
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log();
  console.log('Suggest that you begin by, creating 3 terminals.');
  console.log();
  console.log('In one terminal type:');
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'install '}`));
  console.log(
    `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}chain`)}`
  );
  console.log();
  console.log('In a second terminal type:');
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(
    `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}deploy`)}`
  );
  console.log();
  console.log('In a third terminal type:');
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(
    `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}dev`)}`
  );
  console.log();
};

module.exports = {
  init,
};
