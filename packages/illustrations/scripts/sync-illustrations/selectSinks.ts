import readline from 'node:readline/promises';

import { type Sink } from './sinks/Sink';

export type Ask = (question: string) => Promise<string>;

/** Runs `fn` with one terminal prompt open for its whole duration, so repeated questions share stdin. */
const onTerminal = async <T>(fn: (ask: Ask) => Promise<T>): Promise<T> => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    return await fn((question) => rl.question(question));
  } finally {
    rl.close();
  }
};

/**
 * Parses one answer to the sink prompt: empty or `all` selects every sink, otherwise a comma or
 * space separated list of 1-based numbers and/or sink names. Returns `undefined` for an answer that
 * names nothing or something unknown, so the caller can ask again.
 */
export const parseSinkSelection = (answer: string, sinks: Sink[]): Sink[] | undefined => {
  const trimmed = answer.trim();
  if (trimmed === '' || trimmed.toLowerCase() === 'all') return sinks;

  const selected = new Set<Sink>();
  for (const token of trimmed.split(/[\s,]+/).filter(Boolean)) {
    const byNumber = /^\d+$/.test(token) ? sinks[Number(token) - 1] : undefined;
    const byName = sinks.find((sink) => sink.name.toLowerCase() === token.toLowerCase());
    const sink = byNumber ?? byName;
    if (!sink) return undefined;
    selected.add(sink);
  }
  return selected.size ? sinks.filter((sink) => selected.has(sink)) : undefined;
};

/**
 * Asks which of the configured sinks this run should write to, in configuration order. Repeats
 * the question until the answer names at least one sink. The engine still reconciles the full set
 * and records it in the manifest; a sink left out is repaired by backfill on a later run.
 */
export const chooseSinks = async (sinks: Sink[], ask?: Ask): Promise<Sink[]> => {
  if (!ask) return onTerminal((terminal) => chooseSinks(sinks, terminal));
  const menu = sinks.map((sink, index) => `  ${index + 1}. ${sink.name}`).join('\n');
  const question = `\nSinks available:\n${menu}\nWrite to (numbers or names, comma separated; empty for all): `;
  for (;;) {
    const selected = parseSinkSelection(await ask(question), sinks);
    if (selected) {
      console.log(`Writing to: ${selected.map((sink) => sink.name).join(', ')}`);
      return selected;
    }
    console.log('Unrecognized selection; answer with the numbers or names listed.');
  }
};
