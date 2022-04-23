/* eslint-disable import/no-extraneous-dependencies */
const { execSync } = require('child_process');

function getPkgManager() {
  try {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent) {
      if (userAgent.startsWith('yarn')) {
        return 'yarn';
      } else if (userAgent.startsWith('pnpm')) {
        return 'pnpm';
      }
    }
    try {
      execSync('yarn --version', { stdio: 'ignore' });
      return 'yarn';
    } catch {
      execSync('pnpm --version', { stdio: 'ignore' });
      return 'pnpm';
    }
  } catch {
    return 'npm';
  }
}

exports.getPkgManager = getPkgManager;
