#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const { Command } = require('commander');
const path = require('path');
const prompts = require('prompts');
const { init } = require('./create-app');
const checkForUpdate = require('update-check');
const validated = require('./helpers/validate-pkg');
const packageJson = require('./package.json');
const { getPkgManager } = require('./helpers/get-pkg-manager');

let projectPath = '';

const program = new Command(packageJson.name)
  .version(packageJson.version)
  .arguments('[project-directory]')
  .action((name) => {
    projectPath = name;
    console.log(`projectPath: ${projectPath}`);
  })
  .option(
    '--ts, --typescript',
    `
    Initialize as a TypeScript project.
  `
  )
  .option(
    '--use-npm',
    `
  Explicitly tell the CLI to bootstrap the app using npm
`
  )
  .allowUnknownOption()
  .parse(process.argv);

async function run() {
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim();
  }
  if (!projectPath) {
    const resName = await prompts({
      type: 'text',
      name: 'path',
      message: 'What is your Web3 app named?',
      initial: 'my-app',
      validate: (name) => {
        const validation = validated.validateNpmName(
          path.basename(path.resolve(name))
        );
        if (validation.valid) {
          return true;
        }
        console.log(validation);
        return 'Invalid Name: ' + validation.problems[0];
      },
    });

    if (typeof resName.path === 'string') {
      projectPath = resName.path.trim();
    }
  }

  const resTypescript = await prompts({
    type: 'select',
    name: 'typescript',
    message: 'Javascript or Typescript?',
    choices: [
      { title: 'Javascript', value: false },
      { title: 'Typescript', value: true },
    ],
  });

  const resUseNpm = await prompts({
    type: 'select',
    name: 'useNpm',
    message: 'Use NPM or YARN?',
    choices: [
      { title: 'NPM', value: true },
      { title: 'YARN', value: false },
    ],
  });

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const { valid, problems } = validated.validateNpmName(projectName);
  if (!valid) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    );

    problems.forEach((p) => console.error(`    ${chalk.red.bold('*')} ${p}`));
    process.exit(1);
  }

  try {
    await init({
      appPath: resolvedProjectPath,
      useNpm: resUseNpm.useNpm,
      typescript: resTypescript.typescript,
    });
  } catch (error) {
    console.log(error);
  }
}

const update = checkForUpdate(packageJson).catch(() => null);

async function notifyUpdate() {
  try {
    console.log('Checking for updates...');
    const res = await update;
    if (res?.latest) {
      const pkgManager = getPkgManager();

      console.log();
      console.log(
        chalk.yellow.bold('A new version of `create-web3` is available!')
      );
      console.log(
        'You can update by running: ' +
          chalk.cyan(
            pkgManager === 'yarn'
              ? 'yarn global add create-web3'
              : `${pkgManager} install --global create-web3`
          )
      );
      console.log();
    }
    process.exit();
  } catch {
    // ignore error
  }
}

run()
  .then(notifyUpdate)
  .catch(async (reason) => {
    console.log();
    console.log('Aborting installation.');
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`);
    } else {
      console.log(
        chalk.red(
          'Unexpected error. Please report it as a bug: https://github.com/e-roy/create-web3/issues'
        )
      );
      console.log(reason);
    }
    console.log();

    await notifyUpdate();

    process.exit(1);
  });
