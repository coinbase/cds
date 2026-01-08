/**
 * CLI argument parsing and utilities.
 */

/**
 * Parses command-line arguments for the audit script.
 * @returns {{ ci: boolean, html: boolean }}
 */
export function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    ci: false,
    html: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--ci') {
      options.ci = true;
    } else if (args[i] === '--html') {
      options.html = true;
    } else {
      console.error(`Unknown argument: ${args[i]}`);
      console.error('Usage: node scripts/auditFigmaIntegration/index.mjs [--ci] [--html]');
      process.exit(1);
    }
  }

  // FIGMA_ACCESS_TOKEN is always required for URL and dev resource validation
  if (!process.env.FIGMA_ACCESS_TOKEN) {
    console.error('Error: FIGMA_ACCESS_TOKEN environment variable is required');
    process.exit(1);
  }

  return options;
}
