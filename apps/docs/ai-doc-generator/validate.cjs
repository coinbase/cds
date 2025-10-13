const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

/**
 * Validates that all expected LLM documentation files exist.
 * This ensures that the LLMDocButtons component won't link to missing files.
 */

// Platforms to validate
const PLATFORMS = ['web', 'mobile'];

// Parse command line arguments
const args = process.argv.slice(2);
const pathArg = args[0];

// Get output path from command line arg, or default to dist/llms
const getOutputPath = () => {
  if (pathArg === 'dist') {
    return path.resolve(__dirname, '../dist/llms');
  } else if (pathArg) {
    return path.resolve(__dirname, '..', pathArg);
  }
  return path.resolve(__dirname, '../dist/llms');
};

const OUTPUT_PATH = getOutputPath();

// Doc sections and their glob patterns
const DOC_SECTIONS = {
  components: 'docs/components/**/*.mdx',
  hooks: 'docs/hooks/**/*.mdx',
  'getting-started': 'docs/getting-started/**/*.mdx',
};

/**
 * Extract platform availability from MDX frontmatter
 * Returns { web: boolean, mobile: boolean } or null if no frontmatter
 */
function getPlatformAvailability(mdxFilePath, docsRoot) {
  const fullPath = path.join(docsRoot, mdxFilePath);
  const content = fs.readFileSync(fullPath, 'utf-8');

  // Parse frontmatter for platform_switcher_options
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    // No frontmatter = fragment file, skip it
    return null;
  }

  const frontmatter = frontmatterMatch[1];
  const platformOptionsMatch = frontmatter.match(/platform_switcher_options:\s*{([^}]+)}/);

  if (platformOptionsMatch) {
    const optionsStr = platformOptionsMatch[1];
    const webMatch = optionsStr.match(/web:\s*(\w+)/);
    const mobileMatch = optionsStr.match(/mobile:\s*(\w+)/);

    return {
      web: webMatch ? webMatch[1] === 'true' : false,
      mobile: mobileMatch ? mobileMatch[1] === 'true' : false,
    };
  }

  // Default: available on both platforms
  return { web: true, mobile: true };
}

/**
 * Extract the expected LLM doc filename from an MDX file path
 * This matches the logic in LLMDocButtons component
 */
function getExpectedLLMDocName(mdxFilePath) {
  // Get the last segment of the path (the filename or directory name)
  const parts = mdxFilePath.split(path.sep);

  // Remove the 'index.mdx' or '.mdx' to get the name
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    if (part === 'index.mdx') {
      // Use the parent directory name
      return parts[i - 1];
    } else if (part.endsWith('.mdx')) {
      const fileName = path.parse(part).name;
      // Skip partial files (start with _)
      if (fileName.startsWith('_')) {
        return null;
      }
      // Use the filename without extension
      return fileName;
    }
  }

  return null;
}

/**
 * Get the doc type (components, hooks, getting-started) from a file path
 */
function getDocType(mdxFilePath) {
  for (const [docType, pattern] of Object.entries(DOC_SECTIONS)) {
    if (mdxFilePath.includes(`docs/${docType}/`)) {
      return docType;
    }
  }
  return null;
}

/**
 * Validate LLM docs for a given output path
 */
function validateOutputPath(outputPath) {
  console.log(`\nValidating LLM docs at: ${outputPath}`);

  if (!fs.existsSync(outputPath)) {
    console.error(`❌ Output path does not exist: ${outputPath}`);
    return false;
  }

  const errors = [];
  const docsRoot = path.resolve(__dirname, '../');

  // Check each doc section
  for (const [docType, pattern] of Object.entries(DOC_SECTIONS)) {
    const mdxFiles = globSync(pattern, { cwd: docsRoot });

    for (const mdxFile of mdxFiles) {
      const expectedName = getExpectedLLMDocName(mdxFile);
      if (!expectedName) continue;

      // Get platform availability from frontmatter
      const platformAvailability = getPlatformAvailability(mdxFile, docsRoot);

      // Skip files without frontmatter (fragment files)
      if (!platformAvailability) continue;

      // Check for each platform (only if available on that platform)
      for (const platform of PLATFORMS) {
        // Skip if component is not available on this platform
        if (!platformAvailability[platform]) {
          continue;
        }

        const expectedFile = path.join(outputPath, platform, docType, `${expectedName}.txt`);

        if (!fs.existsSync(expectedFile)) {
          errors.push({
            mdxFile,
            platform,
            docType,
            expectedName,
            expectedFile,
          });
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(`\n❌ Found ${errors.length} missing LLM doc(s):\n`);
    // Only show first 10 to avoid overwhelming output
    errors.slice(0, 10).forEach(({ mdxFile, platform, docType, expectedName }) => {
      console.error(`  - ${mdxFile} (${platform})`);
    });
    if (errors.length > 10) {
      console.error(`  ... and ${errors.length - 10} more`);
    }
    console.error(`\n❌ These docs should be generated but are missing!`);

    return false; // Always fail when docs are missing
  }

  console.log(`✅ All LLM docs validated successfully!`);
  return true;
}

/**
 * Main validation function
 */
function validate() {
  console.log('🔍 Validating LLM documentation files...\n');

  const isValid = validateOutputPath(OUTPUT_PATH);

  if (!isValid) {
    console.error('\n❌ LLM documentation validation failed!');
    process.exit(1);
  }

  console.log('\n✅ LLM documentation validation complete!');
}

// Run validation
validate();
