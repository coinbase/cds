import chalkImport from 'chalk';
import { readFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { basename } from 'node:path';
import { isCI } from './isCI';

export type LogParam = string | string[] | Record<string, unknown>;

const chalk = new chalkImport.Instance({ level: 3 });
Object.defineProperty(globalThis, 'navigator', {
  value: {
    userAgent: 'node',
  },
  writable: true,
  configurable: true,
});

const filteredKeywords = ['password', 'keyPass'];

function filterKeys(object: Record<string, unknown>) {
  filteredKeywords.forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    delete object[key];
  });
}

export function sanitizeString(str: string) {
  const words = str.split(' ');
  const needsToBeRedacted = words.some((word) => {
    const isPath = word.includes('/');
    const isFile = /(.*\..*)/.test(word);
    const hasKeyword = new RegExp(filteredKeywords.join('|'), 'i').test(word);
    return hasKeyword && !(isPath || isFile);
  });

  if (needsToBeRedacted) {
    return `REDACTED because contained a sensitive keyword`;
  }

  const hasPrivateKey = /([A-Z0-9]{40})/.test(str);
  if (hasPrivateKey) {
    return 'REDACTED because seems to contain a private key';
  }

  return str;
}

function sanitizeRecursive(value: LogParam): LogParam {
  if (typeof value === 'string') {
    return sanitizeString(value);
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeRecursive) as string[];
  }

  if (typeof value === 'object') {
    const objectValue = { ...value } as Record<string, LogParam>;
    filterKeys(objectValue);

    for (const key of Object.keys(objectValue)) {
      objectValue[key] = sanitizeRecursive(objectValue[key]);
    }

    return objectValue;
  }

  return value;
}

function sanitize(value: LogParam) {
  return sanitizeRecursive(value ? (JSON.parse(JSON.stringify(value)) as LogParam) : value);
}

export function logNewLine(stream: { write: (chunk: string) => void } = process.stdout) {
  return stream.write(EOL);
}

export type LogOutStream = { write: (chunk: string) => void };
function doLog(
  decoratorFunc: (data: string) => string,
  data: LogParam,
  stream?: LogOutStream,
  { addLogGroup, isDebug }: { addLogGroup?: boolean; isDebug?: boolean } = {},
) {
  const sanitizedData = sanitize(data);
  const isJson = sanitizedData && typeof sanitizedData === 'object';

  const message: string = isJson
    ? JSON.stringify(sanitizedData, null, 3)
    : sanitizedData.toString();

  if (addLogGroup) {
    stream?.write(`::group::${decoratorFunc(message)} ${EOL}`);
  } else if (isDebug) {
    stream?.write(`::debug::${decoratorFunc(message)} ${EOL}`);
  } else {
    stream?.write(`${decoratorFunc(message)} ${EOL}`);
  }
}

export function log(data: LogParam, outputStream: LogOutStream = process.stdout) {
  doLog(chalk.white, data, outputStream);
}

export function logPlain(data: LogParam, outputStream: LogOutStream = process.stdout) {
  doLog((d) => d, data, outputStream);
}

export function logInfo(data: LogParam, outputStream: LogOutStream = process.stdout) {
  doLog(chalk.white, data, outputStream);
}

export function logDebug(data: LogParam, outputStream: LogOutStream = process.stdout) {
  return doLog(chalk.dim, data, outputStream, { isDebug: true });
}

export function logSuccess(data: LogParam, outputStream: LogOutStream = process.stdout) {
  return doLog(chalk.green, data, outputStream);
}

export function logWarn(data: LogParam, outputStream: LogOutStream = process.stdout) {
  return doLog(chalk.yellow, data, outputStream);
}

export function logWarns(data: string[], outputStream: LogOutStream = process.stdout) {
  return doLog(chalk.yellow, data.join(EOL), outputStream);
}

export function logError(data: LogParam, outputStream: LogOutStream = process.stdout) {
  return doLog(chalk.red, data, outputStream);
}

export function logVerbose(data: LogParam, outputStream: LogOutStream = process.stdout) {
  return doLog(
    chalk.dim,
    data,
    process.env.VERBOSE_LOGGING === 'true' || isCI() ? outputStream : undefined,
  );
}

export function logFile(file: string, loggingFn: (data: LogParam) => void) {
  const filename = basename(file);
  loggingFn(`======= Begin ${filename} file =======`);
  readFileSync(file, 'utf-8')
    .split('\n')
    .forEach((line) => loggingFn(line));
  loggingFn(`======= End ${filename} file =======`);
}

export const color = {
  commit: chalk.yellow,
  failure: chalk.red,
  file: chalk.blueBright,
  muted: chalk.gray,
  project: chalk.cyan,
  shell: chalk.magentaBright,
  success: chalk.gray,
  target: chalk.magenta,
  url: chalk.blue,
  warning: chalk.yellow,
};
