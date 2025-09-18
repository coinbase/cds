import { execSync } from 'node:child_process';
import fs from 'node:fs';

// Function to get the file hash
export async function getFileHash(file: string) {
  try {
    // Ensure the file exists
    if (!fs.existsSync(file)) {
      throw new Error('File does not exist');
    }

    // Command to calculate the SHA256 hash of the file
    // Directly using 'sha256sum' command and parsing its output
    const command = `sha256sum "${file}" | awk '{ print $1 }'`;

    // Execute the command synchronously and capture the output
    const output = execSync(command).toString().trim();

    return output;
  } catch (error) {
    console.error('Error calculating file hash:', (error as Error).message);
    return null;
  }
}
