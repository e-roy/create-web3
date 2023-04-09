const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');
const cpy = require('cpy');
const checkWriteable = require('./helpers/is-writeable');
const makeDir = require('./helpers/make-dir');
const checkFolder = require('./helpers/is-folder-empty');
const gitInit = require('./helpers/git');

const init = async ({
  appPath,
  useNpm,
  typescript,
  framework,
  backend,
  css,
}) => {
  console.log('running create-permaweb-app');
  const template = typescript ? 'typescript' : 'default';
  const root = path.resolve(appPath);

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

  // await makeDir.makeDir(path.join(root, 'packages'));
  // await makeDir.makeDir(path.join(root, 'packages', 'frontend'));
  // await makeDir.makeDir(path.join(root, 'packages', 'backend'));

  const useYarn = useNpm ? false : true;
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
    dev: 'yarn workspace @create-permaweb-app/frontend dev',
    build: 'yarn workspace @create-permaweb-app/frontend build',
    start: 'yarn workspace @create-permaweb-app/frontend start',
    lint: 'yarn workspace @create-permaweb-app/frontend lint',
  };

  const viteScripts = {
    dev: 'yarn workspace @create-permaweb-app/frontend dev',
    build: 'yarn workspace @create-permaweb-app/frontend build',
    serve: 'yarn workspace @create-permaweb-app/frontend serve',
  };

  const arweaveScripts = {
  };

  const frontendScripts = framework === 'vite' ? viteScripts : nextScripts;
  const backendScripts = arweaveScripts

  const packageJson = {
    name: appName,
    version: '0.0.1',
    description: `create-permaweb-app monorepo quickstart with ${framework} and ${backend}`,
    main: 'index.js',
    private: true,
    scripts: {
      ...frontendScripts,
      ...backendScripts,
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

  console.log();
  /**
   * Copy the template files to the target directory.
   */

  /**
   * Copy common files.
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

  /**
   * Copy backend files.
   */
  // const backendpath = '';

  // await cpy('**', root + '/packages/backend/', {
  //   parents: true,
  //   // cwd: path.join(__dirname, "templates", template),
  //   cwd: path.join(__dirname, 'templates', backendpath),

  //   filter: (name) => {
  //     if (name.relativePath === 'package.json') {
  //       return false;
  //     }
  //     return true;
  //   },
  //   rename: (name) => {
  //     switch (name) {
  //       case 'package-template.json': {
  //         return 'package.json';
  //       }
  //       case 'gitmodules': {
  //         return '.'.concat(name);
  //       }
  //       default: {
  //         return name;
  //       }
  //     }
  //   },
  // });

  /**
   * Copy frontend files.
   */

  await cpy('**', root + '/', {
    parents: true,
    cwd: path.join(__dirname, 'templates', framework, template),
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

  /**
   * Copy css framework files.
   */

  if (css) {
    await cpy('**', root + '/', {
      parents: true,
      cwd: path.join(__dirname, 'templates/css', css, framework, template),
    });
  }

  /**
   * Init git.
   */

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
    `For a walk through guild, visit https://www.create-permaweb-app.xyz/get-started/quick-start`
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
