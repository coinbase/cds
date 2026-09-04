const moduleName = process.argv[2];
const before = Date.now();
const importedModule = require(moduleName);
const after = Date.now();
process.send(after - before);
process.exit(0);
