/**
 * Logging utilities for tracking migration progress and issues
 */

import fs from 'fs';
import path from 'path';

import { LOG_FILE_NAME } from './constants';

export const LogLevel = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  TODO: 'TODO',
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export type LogEntry = {
  timestamp: string;
  level: LogLevel;
  file?: string;
  line?: number;
  message: string;
  details?: string;
};

/**
 * Migration logger for tracking changes and issues
 */
export class MigrationLogger {
  private logPath: string;
  private entries: LogEntry[] = [];

  constructor(outputDir: string = process.cwd()) {
    this.logPath = path.join(outputDir, LOG_FILE_NAME);
    this.initializeLog();
  }

  private initializeLog(): void {
    const header = `CDS Migration Log
Generated: ${new Date().toISOString()}
========================================\n\n`;

    fs.writeFileSync(this.logPath, header, 'utf-8');
  }

  /**
   * Add a log entry
   */
  private addEntry(entry: LogEntry): void {
    this.entries.push(entry);
    this.writeEntry(entry);
  }

  private writeEntry(entry: LogEntry): void {
    const location = entry.file ? ` [${entry.file}${entry.line ? `:${entry.line}` : ''}]` : '';
    const details = entry.details ? `\n  ${entry.details}` : '';

    const line = `[${entry.timestamp}] ${entry.level}${location}: ${entry.message}${details}\n`;
    fs.appendFileSync(this.logPath, line, 'utf-8');
  }

  /**
   * Log an informational message
   */
  info(message: string, file?: string, line?: number): void {
    this.addEntry({
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      file,
      line,
      message,
    });
  }

  /**
   * Log a warning
   */
  warn(message: string, file?: string, line?: number, details?: string): void {
    this.addEntry({
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      file,
      line,
      message,
      details,
    });
  }

  /**
   * Log an error
   */
  error(message: string, file?: string, line?: number, details?: string): void {
    this.addEntry({
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      file,
      line,
      message,
      details,
    });
  }

  /**
   * Log a successful transformation
   */
  success(message: string, file?: string, line?: number): void {
    this.addEntry({
      timestamp: new Date().toISOString(),
      level: LogLevel.SUCCESS,
      file,
      line,
      message,
    });
  }

  /**
   * Log a TODO item (manual migration required)
   */
  todo(message: string, file?: string, line?: number, details?: string): void {
    this.addEntry({
      timestamp: new Date().toISOString(),
      level: LogLevel.TODO,
      file,
      line,
      message,
      details,
    });
  }

  /**
   * Generate a summary of the migration
   */
  writeSummary(): void {
    const summary = `
========================================
Migration Summary
========================================

Total Entries: ${this.entries.length}
- INFO: ${this.entries.filter((e) => e.level === LogLevel.INFO).length}
- SUCCESS: ${this.entries.filter((e) => e.level === LogLevel.SUCCESS).length}
- WARN: ${this.entries.filter((e) => e.level === LogLevel.WARN).length}
- ERROR: ${this.entries.filter((e) => e.level === LogLevel.ERROR).length}
- TODO: ${this.entries.filter((e) => e.level === LogLevel.TODO).length}

`;

    fs.appendFileSync(this.logPath, summary, 'utf-8');

    // List all TODO items
    const todos = this.entries.filter((e) => e.level === LogLevel.TODO);
    if (todos.length > 0) {
      const todoList = `
Manual Migration Required (${todos.length} items):
${todos.map((t) => `  - ${t.file || 'Unknown file'}: ${t.message}`).join('\n')}

`;
      fs.appendFileSync(this.logPath, todoList, 'utf-8');
    }

    console.log(`\n📝 Migration log written to: ${this.logPath}`);
  }

  /**
   * Get the log file path
   */
  getLogPath(): string {
    return this.logPath;
  }

  /**
   * Get all log entries
   */
  getEntries(): LogEntry[] {
    return [...this.entries];
  }

  /**
   * Get entries by level
   */
  getEntriesByLevel(level: LogLevel): LogEntry[] {
    return this.entries.filter((e) => e.level === level);
  }
}

/**
 * Create a global logger instance
 */
let globalLogger: MigrationLogger | null = null;

export function createLogger(outputDir?: string): MigrationLogger {
  globalLogger = new MigrationLogger(outputDir);
  return globalLogger;
}

export function getLogger(): MigrationLogger | null {
  return globalLogger;
}
