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

const init = async ({ appPath, useNpm, typescript, frontend, backend }) => {
  console.log('running create-web3');
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
  await makeDir.makeDir(path.join(root, 'packages', 'frontend'));
  await makeDir.makeDir(path.join(root, 'packages', 'backend'));

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

  const nextScripts = {
    dev: 'yarn workspace @create-web3/frontend dev',
    build: 'yarn workspace @create-web3/frontend build',
    start: 'yarn workspace @create-web3/frontend start',
    lint: 'yarn workspace @create-web3/frontend lint',
  };

  const viteScripts = {
    dev: 'yarn workspace @create-web3/frontend dev',
    build: 'yarn workspace @create-web3/frontend build',
    serve: 'yarn workspace @create-web3/frontend serve',
  };

  const hardhatScripts = {
    chain: 'yarn workspace @create-web3/backend chain',
    compile: 'yarn workspace @create-web3/backend compile',
    clean: 'yarn workspace @create-web3/backend clean',
    deploy: 'yarn workspace @create-web3/backend deploy',
  };

  const frontendScripts = frontend === 'vite' ? viteScripts : nextScripts;

  const packageJson = {
    name: appName,
    version: '0.0.1',
    description: `create-web3 monorepo quickstart with ${frontend} and ${backend}`,
    main: 'index.js',
    private: true,
    scripts: {
      ...frontendScripts,
      ...hardhatScripts,
    },
    workspaces: {
      packages: ['packages/*'],
      nohoist: [
        '**/@graphprotocol/graph-ts',
        '**/@graphprotocol/graph-ts/**',
        '**/backend',
        '**/backend/**',
      ],
    },
  };
  /**
   * Write it to disk.
   */
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

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
    cwd: path.join(__dirname, 'templates', 'common'),
    rename: (name) => {
      switch (name) {
        case 'gitignore':
        case 'env.example':
        case 'eslintrc.json': {
          return '.'.concat(name);
        }
        case 'README-template.md': {
          return 'README.md';
        }
        default: {
          return name;
        }
      }
    },
  });

  const backendpath = backend === 'hardhat' ? `hardhat/${template}` : 'foundry';

  await cpy('**', root + '/packages/backend/', {
    parents: true,
    // cwd: path.join(__dirname, "templates", "hardhat", template),
    cwd: path.join(__dirname, 'templates', backendpath),

    filter: (name) => {
      if (name.relativePath === 'package.json') {
        return false;
      }
      return true;
    },
    rename: (name) => {
      switch (name) {
        case 'package-template.json': {
          return 'package.json';
        }
        default: {
          return name;
        }
      }
    },
  });

  await cpy('**', root + '/packages/frontend/', {
    parents: true,
    cwd: path.join(__dirname, 'templates', frontend, template),
    filter: (name) => {
      if (name.relativePath === 'package.json') {
        return false;
      }
      return true;
    },
    rename: (name) => {
      switch (name) {
        case 'package-template.json': {
          return 'package.json';
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
  console.log();
  console.log(
    'Get started by going into the directory and install dependencies.'
  );
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'install '}`));
  console.log();
  console.log(
    `For a walk through guild, visit https://www.create-web3.xyz/get-started/quick-start`
  );
  // console.log('Inside that directory, you can run several commands:');
  // console.log();
  // console.log();
  // console.log('Suggest that you begin by, creating 3 terminals.');
  // console.log();
  // console.log('In one terminal type:');
  // console.log(chalk.cyan('  cd'), cdpath);
  // console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'install '}`));
  // console.log(
  //   `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}chain`)}`
  // );
  // console.log();
  // console.log('In a second terminal type:');
  // console.log(chalk.cyan('  cd'), cdpath);
  // console.log(
  //   `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}deploy`)}`
  // );
  // console.log();
  // console.log('In a third terminal type:');
  // console.log(chalk.cyan('  cd'), cdpath);
  // console.log(
  //   `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}dev`)}`
  // );
  console.log();
};

module.exports = {
  init,
};
