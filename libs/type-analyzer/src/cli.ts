import { formatTypeAnalysis, type TypeAnalysisFormat } from './format/formatTypeAnalysis';
import { analyzeType } from './analyzeType';

type CliOptions = {
  expandTypes: boolean;
  filePath?: string;
  format: TypeAnalysisFormat;
  includeNestedOrigins: boolean;
  symbolName?: string;
  tsconfigPath?: string;
};

const supportedFormats = new Set<TypeAnalysisFormat>(['json', 'markdown', 'text']);

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    expandTypes: false,
    format: 'text',
    includeNestedOrigins: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === '--nested') {
      options.includeNestedOrigins = true;
      continue;
    }

    if (arg === '--expand-types') {
      options.expandTypes = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }

    const nextValue = args[index + 1];
    if (!nextValue || nextValue.startsWith('--')) {
      throw new Error(`Missing value for ${arg}`);
    }

    if (arg === '--file') {
      options.filePath = nextValue;
    } else if (arg === '--type' || arg === '--symbol') {
      options.symbolName = nextValue;
    } else if (arg === '--tsconfig') {
      options.tsconfigPath = nextValue;
    } else if (arg === '--format') {
      if (!supportedFormats.has(nextValue as TypeAnalysisFormat)) {
        throw new Error(`Unsupported format "${nextValue}". Use text, markdown, or json.`);
      }
      options.format = nextValue as TypeAnalysisFormat;
    } else {
      throw new Error(`Unknown option ${arg}`);
    }

    index += 1;
  }

  return options;
}

function run(): void {
  const options = parseArgs(process.argv.slice(2));
  if (!options.filePath || !options.symbolName) {
    printHelp();
    process.exitCode = 1;
    return;
  }

  const result = analyzeType({
    expandTypes: options.expandTypes,
    filePath: options.filePath,
    includeNestedOrigins: options.includeNestedOrigins,
    symbolName: options.symbolName,
    tsconfigPath: options.tsconfigPath,
  });

  process.stdout.write(formatTypeAnalysis(result, options.format));
}

function printHelp(): void {
  process.stdout.write(`Analyze a TypeScript type and group properties by origin.

Usage:
  yarn nx run type-analyzer:analyze -- --file <path> --type <symbol> [options]

Options:
  --file <path>       Source file containing the type.
  --type <symbol>     Exported type alias or interface to analyze.
  --symbol <symbol>   Alias for --type.
  --tsconfig <path>   Explicit tsconfig path. Defaults to nearest tsconfig.json.
  --format <format>   Output format: text, markdown, json. Defaults to text.
  --nested            Include nested origin groups for referenced types.
  --expand-types      Print fully expanded checker type strings.
  --help              Show this help text.
`);
}

try {
  run();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
