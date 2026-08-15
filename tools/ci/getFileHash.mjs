import { execSync } from 'node:child_process';
import fs from 'node:fs';

export async function getFileHash(file) {
  try {
    if (!fs.existsSync(file)) {
      throw new Error('File does not exist');
    }

    const command = `sha256sum "${file}" | awk '{ print $1 }'`;
    const output = execSync(command).toString().trim();

    return output;
  } catch (error) {
    console.error('Error calculating file hash:', error.message);
    return null;
  }
}
