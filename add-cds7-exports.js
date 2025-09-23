const glob = require('glob');
const globSync = glob.globSync || glob.sync;
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

// Get a package name and a target directory as an argument
// Download the latest v7 of that package
// Extract it into the target directory
// Edit the v7 global styles or icon fonts as necessary
// Edit the package.json exports field

const args = process.argv.slice(2);
const packageName = args[0]; // '@cbhq/cds-common'
const PACKAGE_ROOT = process.cwd();

if (!PACKAGE_ROOT.includes('packages'))
  throw Error('Run this script from the target package root.');

/** Do not change this! */
const packageUpdateOrder = [
  '@cbhq/cds-common',
  '@cbhq/cds-icons',
  '@cbhq/cds-illustrations',
  '@cbhq/cds-mobile-visualization',
  '@cbhq/cds-mobile',
  '@cbhq/cds-web-visualization',
  '@cbhq/cds-web',
  '@cbhq/cds-lottie-files',
  '@cbhq/ui-mobile-playground',
  '@cbhq/cds-utils',
];

const packageVersionMap = {
  '@cbhq/cds-common': '^7',
  '@cbhq/cds-icons': '^4',
  '@cbhq/cds-illustrations': '^4',
  '@cbhq/cds-mobile-visualization': '^2',
  '@cbhq/cds-mobile': '^7',
  '@cbhq/cds-web-visualization': '^2',
  '@cbhq/cds-web': '^7',
  '@cbhq/cds-lottie-files': '^2',
  '@cbhq/ui-mobile-playground': '^3',
  '@cbhq/cds-utils': '2.0.0',
};

const globalStylesV7Content = `:root {
    --border-radius-rounded-none: 0px;
    --border-radius-rounded-small: 4px;
    --border-radius-rounded: 8px;
    --border-radius-rounded-medium: 12px;
    --border-radius-rounded-large: 16px;
    --border-radius-rounded-x-large: 24px;
    --border-radius-rounded-full: 1000px;
    --border-width-none: 0px;
    --border-width-button: 1px;
    --border-width-card: 1px;
    --border-width-checkbox: 2px;
    --border-width-radio: 2px;
    --border-width-sparkline: 2px;
    --border-width-focus-ring: 2px;
    --border-width-input: 1px;
  }`;

const resetColor = `\x1b[0m`;
const greenColor = `\x1b[32m`;
const yellowColor = `\x1b[33m`;
const redColor = `\x1b[31m`;
const magentaColor = `\x1b[35m`;
const grayColor = `\x1b[90m`;

if (!packageName) {
  console.error(`Must specify package name. Usage:
${grayColor}node add-cds7-exports.js <packageName>${resetColor}
`);
  process.exit(1);
}

const esmDir = path.join(PACKAGE_ROOT, 'esm');

if (!fs.existsSync(esmDir)) throw Error(`Output directory ${esmDir} does not exist`);

console.log(`Downloading ${packageName} to ${esmDir}`);

try {
  console.log(`Running npm pack for ${packageName}@${packageVersionMap[packageName]}...`);

  execSync(
    `npm pack --registry=https://registry-npm.cbhq.net ${packageName}@${packageVersionMap[packageName]}`,
    {
      cwd: esmDir,
      stdio: 'ignore',
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
    },
  );

  console.log('npm pack completed successfully');

  const tarballFilepath = globSync(`${esmDir}/*.tgz`)[0];
  if (!tarballFilepath) {
    throw new Error(`No tarball file found after npm pack. Expected a .tgz file in ${esmDir}`);
  }
  console.log(`Found tarball: ${path.basename(tarballFilepath)}`);

  console.log('Extracting tarball...');
  execSync(`tar -xf ${tarballFilepath}`, {
    cwd: esmDir,
    stdio: 'ignore',
    maxBuffer: 1024 * 1024 * 10, // 10MB buffer
  });
  console.log('Tarball extracted successfully');

  fs.rmSync(tarballFilepath);

  const v7Dir = path.join(esmDir, 'v7');
  const packageDir = `${esmDir}/package`;

  if (!fs.existsSync(packageDir)) {
    throw new Error(`Package directory not found after extraction. Expected: ${packageDir}`);
  }

  fs.renameSync(packageDir, v7Dir);

  const v7PackageJsonPath = `${v7Dir}/package.json`;
  if (!fs.existsSync(v7PackageJsonPath)) {
    throw new Error(`package.json not found in extracted package: ${v7PackageJsonPath}`);
  }

  const v7PackageJson = JSON.parse(fs.readFileSync(v7PackageJsonPath, 'utf-8'));
  fs.rmSync(`${v7Dir}/package.json`);
  fs.rmSync(`${v7Dir}/README.md`);
  fs.rmSync(`${v7Dir}/CHANGELOG.md`);

  // If it's the icons package, we need to rename the icon font and font files
  if (packageName === '@cbhq/cds-icons') {
    fs.renameSync(
      `${v7Dir}/esm/fonts/native/CoinbaseIcons.ttf`,
      `${v7Dir}/esm/fonts/native/CoinbaseIconsV7.ttf`,
    );
    const iconFontCssPath = `${v7Dir}/esm/fonts/web/icon-font.css`;
    const iconFontCss = fs.readFileSync(iconFontCssPath, 'utf-8');
    const newIconFontCss = iconFontCss.replace("'CoinbaseIcons'", "'CoinbaseIconsV7'");
    fs.writeFileSync(iconFontCssPath, newIconFontCss, { encoding: 'utf-8' });

    // Update the font metadata using Node.js only (no third-party packages)
    const fontPath = `${v7Dir}/esm/fonts/native/CoinbaseIconsV7.ttf`;

    try {
      const fontBuffer = fs.readFileSync(fontPath);
      const beforeName = getTtfFamilyName(fontBuffer) || 'unknown';
      const modifiedBuffer = updateTtfNameTable(fontBuffer, 'CoinbaseIconsV7');
      const afterName = getTtfFamilyName(modifiedBuffer) || 'unknown';
      console.log(`Font family before: ${beforeName}`);
      console.log(`Font family after: ${afterName}`);
      fs.writeFileSync(fontPath, modifiedBuffer);
    } catch (error) {
      console.warn(
        `${yellowColor}Warning: Could not update font metadata. Font file may still work but will have the old family name.${resetColor}`,
      );
      console.warn(`Error: ${error.message}`);
    }
  }

  // If it's the web package, we need to create a new v7 global styles in v8 for compatibility when using both v7 and v8 at the same time
  if (packageName === '@cbhq/cds-web') {
    const globalStylesFilename = 'globalStylesV7.css';
    const globalStylesCompatPath = `${esmDir}/${globalStylesFilename}`;
    fs.writeFileSync(globalStylesCompatPath, globalStylesV7Content, { encoding: 'utf-8' });
    const packageJsonPath = `${PACKAGE_ROOT}/package.json`;
    const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
    const newPackageJson = packageJson.replace(
      '"exports": {',
      `"exports": {\n    "./${globalStylesFilename}": "./esm/${globalStylesFilename}",`,
    );
    fs.writeFileSync(packageJsonPath, newPackageJson, { encoding: 'utf-8' });
  }

  // For any package, we need to update the icon font face and all import paths to use the v7 subpath
  const filesToUpdate = globSync(`${v7Dir}/**/*.{js,jsx,ts,tsx,json,d.ts,mjs,cjs,css}`);
  for (const file of filesToUpdate) {
    const fileContent = fs.readFileSync(file, 'utf-8');
    let newFileContent = fileContent.replaceAll("'CoinbaseIcons'", "'CoinbaseIconsV7'");
    for (const packageName of packageUpdateOrder) {
      // Temporarily replace instances followed by hyphen to protect them
      const placeholder = `__TEMP_${Math.random().toString(36).substr(2, 9)}__`;
      newFileContent = newFileContent.replaceAll(`${packageName}-`, `${placeholder}-`);

      // Now safely replace the remaining instances
      newFileContent = newFileContent.replaceAll(packageName, `${packageName}/v7`);

      // Restore the protected instances
      newFileContent = newFileContent.replaceAll(`${placeholder}-`, `${packageName}-`);
    }
    fs.writeFileSync(file, newFileContent, { encoding: 'utf-8' });
  }

  // For any package, we need to update the package.json exports
  const exportPaths = v7PackageJson.exports;
  delete exportPaths['./package.json'];
  delete exportPaths['.'];

  const newExportPaths = Object.fromEntries(
    Object.entries(exportPaths).map(([key, value]) => [
      key.replace('./', './v7/'),
      Object.fromEntries(
        Object.entries(value).map(([key, value]) => [key, value.replace('./', './esm/v7/')]),
      ),
    ]),
  );

  const v8PackageJson = JSON.parse(fs.readFileSync(`${PACKAGE_ROOT}/package.json`, 'utf-8'));

  v8PackageJson.exports = {
    ...v8PackageJson.exports,
    './v7': {
      types: './esm/v7/dts/index.d.ts',
      default: './esm/v7/esm/index.js',
    },
    ...newExportPaths,
  };

  fs.writeFileSync(`${PACKAGE_ROOT}/package.json`, JSON.stringify(v8PackageJson, null, 2), {
    encoding: 'utf-8',
  });

  console.log(`${greenColor}✅ Successfully added CDS 7 exports for ${packageName}${resetColor}`);
} catch (error) {
  console.error('Error adding CDS 7 exports:', error);
}

/**
 * Update TTF 'name' table (IDs 1, 4, 6) to a new family name using pure Node buffers.
 * This function minimally edits the existing name records in-place where possible,
 * or rebuilds the name table if necessary, and recomputes checksums.
 */
function updateTtfNameTable(ttfBuffer, newFamilyName) {
  // Helpers
  const readUInt16 = (buf, off) => buf.readUInt16BE(off);
  const readInt16 = (buf, off) => buf.readInt16BE(off);
  const readUInt32 = (buf, off) => buf.readUInt32BE(off);
  const writeUInt16 = (buf, off, val) => buf.writeUInt16BE(val, off);
  const writeUInt32 = (buf, off, val) => buf.writeUInt32BE(val, off);

  // sfnt header
  const numTables = readUInt16(ttfBuffer, 4);
  const tableDirOffset = 12;

  const findTable = (buf, tagStr) => {
    const tag = Buffer.from(tagStr);
    for (let i = 0; i < numTables; i++) {
      const off = tableDirOffset + i * 16;
      if (buf.slice(off, off + 4).compare(tag) === 0) {
        const checksum = readUInt32(buf, off + 4);
        const offset = readUInt32(buf, off + 8);
        const length = readUInt32(buf, off + 12);
        return { index: i, dirOffset: off, checksum, offset, length };
      }
    }
    return null;
  };

  const nameTable = findTable(ttfBuffer, 'name');
  if (!nameTable) return ttfBuffer; // nothing to do

  const nameOffset = nameTable.offset;
  const format = readUInt16(ttfBuffer, nameOffset);
  const count = readUInt16(ttfBuffer, nameOffset + 2);
  const stringOffset = readUInt16(ttfBuffer, nameOffset + 4);

  // Name records start at nameOffset + 6
  const records = [];
  for (let i = 0; i < count; i++) {
    const recOff = nameOffset + 6 + i * 12;
    const platformID = readUInt16(ttfBuffer, recOff + 0);
    const encodingID = readUInt16(ttfBuffer, recOff + 2);
    const languageID = readUInt16(ttfBuffer, recOff + 4);
    const nameID = readUInt16(ttfBuffer, recOff + 6);
    const length = readUInt16(ttfBuffer, recOff + 8);
    const offset = readUInt16(ttfBuffer, recOff + 10);
    records.push({ recOff, platformID, encodingID, languageID, nameID, length, offset });
  }

  const storageStart = nameOffset + stringOffset;
  const tableEnd = nameOffset + nameTable.length;
  const storageBuffer = Buffer.from(ttfBuffer.slice(storageStart, tableEnd));

  // Build new storage buffer by rewriting IDs 1/4/6 strings.
  const isUnicode = (r) =>
    r.platformID === 0 ||
    (r.platformID === 3 && (r.encodingID === 0 || r.encodingID === 1 || r.encodingID === 10));
  const encodeString = (s, unicode) => {
    if (!unicode) return Buffer.from(s, 'ascii');
    const le = Buffer.from(s, 'utf16le');
    for (let i = 0; i < le.length; i += 2) {
      const tmp = le[i];
      le[i] = le[i + 1];
      le[i + 1] = tmp;
    }
    return le;
  };
  const newPSName = newFamilyName.replace(/\s+/g, '');

  const targetIds = new Set([1, 4, 6]);
  let newStorage = Buffer.alloc(0);
  const newRecordData = [];

  for (let i = 0; i < records.length; i++) {
    const r = records[i];
    const oldStr = storageBuffer.slice(r.offset, r.offset + r.length);
    let newStr = oldStr;
    if (targetIds.has(r.nameID)) {
      const val = r.nameID === 6 ? newPSName : newFamilyName;
      newStr = encodeString(val, isUnicode(r));
    }
    const newOffset = newStorage.length;
    newStorage = Buffer.concat([newStorage, newStr]);
    newRecordData.push({ recOff: r.recOff, length: newStr.length, offset: newOffset });
  }

  // Rebuild name table: header + records + newStorage
  const newNameLength = 6 + count * 12 + newStorage.length;
  const newNameTable = Buffer.alloc(newNameLength);
  writeUInt16(newNameTable, 0, format);
  writeUInt16(newNameTable, 2, count);
  writeUInt16(newNameTable, 4, 6 + count * 12); // stringOffset

  for (let i = 0; i < records.length; i++) {
    const r = records[i];
    const base = 6 + i * 12;
    writeUInt16(newNameTable, base + 0, r.platformID);
    writeUInt16(newNameTable, base + 2, r.encodingID);
    writeUInt16(newNameTable, base + 4, r.languageID);
    writeUInt16(newNameTable, base + 6, r.nameID);
    writeUInt16(newNameTable, base + 8, newRecordData[i].length);
    writeUInt16(newNameTable, base + 10, newRecordData[i].offset);
  }

  newStorage.copy(newNameTable, 6 + count * 12);

  // Splice new name table back into TTF, preserving overall file size if same length, or rebuilding if different
  let output = Buffer.from(ttfBuffer);
  if (newNameTable.length === nameTable.length) {
    newNameTable.copy(output, nameOffset);
  } else {
    // Rebuild: create new buffer with adjusted name table length and offsets after it
    const delta = newNameTable.length - nameTable.length;
    output = Buffer.alloc(ttfBuffer.length + delta);
    // Copy up to name table
    ttfBuffer.copy(output, 0, 0, nameOffset);
    // Copy new name table
    newNameTable.copy(output, nameOffset);
    // Copy remainder after old name table
    const afterOld = nameOffset + nameTable.length;
    ttfBuffer.copy(output, nameOffset + newNameTable.length, afterOld);

    // Update table directory offsets for tables after 'name' and set new 'name' length
    for (let i = 0; i < numTables; i++) {
      const off = tableDirOffset + i * 16;
      const tag = output.slice(off, off + 4).toString('ascii');
      const tOffset = readUInt32(output, off + 8);
      if (tOffset > nameOffset) {
        writeUInt32(output, off + 8, tOffset + delta);
      }
      if (tag === 'name') {
        writeUInt32(output, off + 12, newNameTable.length);
      }
    }
  }

  // Recompute checksums for name table and font header
  const computeChecksum = (buf, start, length) => {
    let sum = 0 >>> 0;
    const end = start + ((length + 3) & ~3);
    for (let i = start; i < end; i += 4) {
      const word = buf.readUInt32BE(i, true);
      sum = (sum + word) >>> 0;
    }
    return sum >>> 0;
  };

  const updatedName = findTable(output, 'name');
  const newNameChecksum = computeChecksum(output, updatedName.offset, updatedName.length);
  writeUInt32(output, updatedName.dirOffset + 4, newNameChecksum);

  // Set head.checkSumAdjustment so that whole-file checksum equals 0xB1B0AFBA
  const head = findTable(output, 'head');
  if (head) {
    // Zero out checkSumAdjustment temporarily
    const headTable = Buffer.from(output.slice(head.offset, head.offset + head.length));
    writeUInt32(headTable, 8, 0);
    headTable.copy(output, head.offset);

    let whole = 0 >>> 0;
    const paddedLen = (output.length + 3) & ~3;
    const padded = Buffer.alloc(paddedLen);
    output.copy(padded);
    for (let i = 0; i < paddedLen; i += 4) {
      whole = (whole + padded.readUInt32BE(i)) >>> 0;
    }
    const adjustment = (0xb1b0afba - whole) >>> 0;
    writeUInt32(output, head.offset + 8, adjustment >>> 0);
  }

  return output;
}

// Minimal reader to extract a reasonable Font Family name (nameID 1) from the TTF 'name' table
function getTtfFamilyName(ttfBuffer) {
  const readUInt16 = (buf, off) => buf.readUInt16BE(off);
  const readUInt32 = (buf, off) => buf.readUInt32BE(off);
  const numTables = readUInt16(ttfBuffer, 4);
  const tableDirOffset = 12;
  const findTable = (tagStr) => {
    const tag = Buffer.from(tagStr);
    for (let i = 0; i < numTables; i++) {
      const off = tableDirOffset + i * 16;
      if (ttfBuffer.slice(off, off + 4).compare(tag) === 0) {
        const offset = readUInt32(ttfBuffer, off + 8);
        const length = readUInt32(ttfBuffer, off + 12);
        return { offset, length };
      }
    }
    return null;
  };
  const nameTable = findTable('name');
  if (!nameTable) return null;
  const nameOffset = nameTable.offset;
  const count = readUInt16(ttfBuffer, nameOffset + 2);
  const stringOffset = readUInt16(ttfBuffer, nameOffset + 4);
  const records = [];
  for (let i = 0; i < count; i++) {
    const recOff = nameOffset + 6 + i * 12;
    const platformID = readUInt16(ttfBuffer, recOff + 0);
    const encodingID = readUInt16(ttfBuffer, recOff + 2);
    const languageID = readUInt16(ttfBuffer, recOff + 4);
    const nameID = readUInt16(ttfBuffer, recOff + 6);
    const length = readUInt16(ttfBuffer, recOff + 8);
    const offset = readUInt16(ttfBuffer, recOff + 10);
    records.push({ platformID, encodingID, languageID, nameID, length, offset });
  }
  const storageStart = nameOffset + stringOffset;
  const readString = (r) => {
    const bytes = ttfBuffer.slice(storageStart + r.offset, storageStart + r.offset + r.length);
    const unicode =
      r.platformID === 0 ||
      (r.platformID === 3 && (r.encodingID === 0 || r.encodingID === 1 || r.encodingID === 10));
    if (!unicode) {
      return bytes.toString('ascii');
    }
    // UTF-16BE -> swap to LE for Node decode
    const le = Buffer.from(bytes);
    for (let i = 0; i < le.length; i += 2) {
      const tmp = le[i];
      le[i] = le[i + 1];
      le[i + 1] = tmp;
    }
    return le.toString('utf16le');
  };
  // Prefer Windows English or any Unicode record; fallback to first
  const candidates = records.filter((r) => r.nameID === 1);
  const preferred =
    candidates.find(
      (r) =>
        r.platformID === 3 && (r.encodingID === 1 || r.encodingID === 0) && r.languageID === 0x0409,
    ) ||
    candidates.find((r) => r.platformID === 0) ||
    candidates[0];
  return preferred ? readString(preferred) : null;
}
