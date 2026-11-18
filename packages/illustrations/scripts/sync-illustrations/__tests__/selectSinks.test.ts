import { type Illustration } from '../illustration';
import { chooseSinks, parseSinkSelection } from '../selectSinks';
import { Sink, type SinkChanges } from '../sinks/Sink';

class PackageSink extends Sink {
  async has(_illustration: Illustration) {
    return true;
  }
  async apply(_changes: SinkChanges) {}
}
class StoriesSink extends PackageSink {}
class AndroidSink extends PackageSink {}

const sinks = [new PackageSink(), new StoriesSink(), new AndroidSink()];

describe('parseSinkSelection', () => {
  it('selects all sinks for an empty answer or "all"', () => {
    expect(parseSinkSelection('', sinks)).toEqual(sinks);
    expect(parseSinkSelection('  ', sinks)).toEqual(sinks);
    expect(parseSinkSelection('All', sinks)).toEqual(sinks);
  });

  it('selects by 1-based number or by name, in configuration order, without duplicates', () => {
    expect(parseSinkSelection('3, 1', sinks)).toEqual([sinks[0], sinks[2]]);
    expect(parseSinkSelection('androidsink StoriesSink', sinks)).toEqual([sinks[1], sinks[2]]);
    expect(parseSinkSelection('2 2 storiessink', sinks)).toEqual([sinks[1]]);
  });

  it('rejects answers that name an unknown sink', () => {
    expect(parseSinkSelection('4', sinks)).toBeUndefined();
    expect(parseSinkSelection('0', sinks)).toBeUndefined();
    expect(parseSinkSelection('1, WebSink', sinks)).toBeUndefined();
    expect(parseSinkSelection(',', sinks)).toBeUndefined();
  });
});

describe('chooseSinks', () => {
  it('lists the sinks and asks again until the answer is valid', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});
    const answers = ['nope', '1 3'];
    const questions: string[] = [];
    const ask = async (question: string) => {
      questions.push(question);
      return answers.shift() ?? '';
    };

    await expect(chooseSinks(sinks, ask)).resolves.toEqual([sinks[0], sinks[2]]);
    expect(questions).toHaveLength(2);
    expect(questions[0]).toContain('1. PackageSink\n  2. StoriesSink\n  3. AndroidSink');
    expect(log).toHaveBeenCalledWith('Writing to: PackageSink, AndroidSink');
    log.mockRestore();
  });
});
