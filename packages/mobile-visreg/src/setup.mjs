import { execSync } from 'child_process';

function isMaestroInstalled() {
  try {
    execSync('which maestro', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

const maestroBin = `${process.env.HOME}/.maestro/bin/maestro`;

if (isMaestroInstalled()) {
  const version = execSync('maestro --version', { encoding: 'utf8' }).trim();
  console.log(`Maestro is already installed: ${version}`);
} else {
  console.log('Installing Maestro CLI...');
  execSync('curl -Ls "https://get.maestro.mobile.dev" | bash', { stdio: 'inherit' });

  const version = execSync(`${maestroBin} --version`, { encoding: 'utf8' }).trim();
  console.log(`\nMaestro installed successfully: ${version}`);
  console.log('\nTo use maestro in your shell, open a new terminal or run:');
  console.log('  export PATH="$PATH:$HOME/.maestro/bin"');
}
